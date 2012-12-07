// toggle player physics
var usePhysics : boolean = false;

// constants
public static var TO_THE_LEFT : int = -1;
public static var TO_THE_RIGHT : int = 1;

// public instance vars
var isMoving : boolean = false;
var jumpHeight : float = 0.5;
var moveSpeed : float = 6;

// private instance vars
private var sprite : OTAnimatingSprite;
private var directionX : int = TO_THE_RIGHT;
var isGrounded : boolean = true;
private var isJumping : boolean = false;
private var reachedJumpApex : boolean = false;
private var verticalSpeed : float = 0.0;
private var state : int = 0;

// starting location
private var startingPosition : Vector2;


// Use this for initialization
function Start() {
	sprite = GetComponent(OTAnimatingSprite);
	sprite.InitCallBacks(this);
	startingPosition = sprite.position;
}

// get private var sprite
function Sprite() : OTAnimatingSprite {
	return sprite;
}

function Jump() {
	isGrounded = false;
	isJumping = true;
	reachedJumpApex = false;
	verticalSpeed = SceneController.CalculateJumpVerticalSpeed(jumpHeight);
}

function IsGrounded() {
	return isGrounded;
}

function MakeGrounded() {
	isGrounded = true;
	isJumping = false;
	reachedJumpApex = false;
	verticalSpeed = 0.0;
}

function MoveLeft() {
	isMoving = true;
	Move(TO_THE_LEFT);
}

function IsMovingLeft() {
	return directionX == Player.TO_THE_LEFT;
}

function MoveRight() {
	isMoving = true;
	Move(TO_THE_RIGHT);
}

function IsMovingRight() {
	return directionX == Player.TO_THE_RIGHT;
}

function Move(direction : int) {
	// change the direction we're facing
	directionX = direction;
	
	// move our player
	movement = new Vector2(direction, verticalSpeed);
	movement *= Time.deltaTime * moveSpeed;
	sprite.position.x += movement.x;
	sprite.position.y += movement.y;
}

function Respawn() {
	isMoving = false;
	MakeGrounded();
	sprite.position = startingPosition;
}

function ApplyGravity() {
	if (isJumping && !reachedJumpApex && verticalSpeed <= 0.0) {
		reachedJumpApex = true;
	}

	if (isGrounded) {
		MakeGrounded();
	} else {
		verticalSpeed -= SceneController.GRAVITY * Time.deltaTime;
		Move(isMoving ? directionX : 0);

		if (sprite.position.y < -20.0) {
			Respawn();
		}
	}
}

// OnEnter is an Orthello 2D collision callback function
// - http://www.wyrmtale.com/orthello/collisions#collisions
public function OnEnter(owner : OTObject) {
	var collisionObject : OTObject = owner.collisionObject;

	// if we hit a platform-like object
	if (collisionObject.physics == OTObject.Physics.StaticBody) {
		// determining the plane of contact adapted from this answer:
		// - http://answers.unity3d.com/questions/248830/collision-surface-check.html
		var collision : Collision = owner.collision;
		var contact : ContactPoint = collision.contacts[0];
    	var normal : Vector3 = contact.normal;

		// if we hit the topside of a platform-like object
		if (normal == Vector3.up) {
			state++;
			if(state > 0) {
				isGrounded = true;
			}
		}
	}
}

// OnExit is an Orthello 2D collision callback function
public function OnExit(owner : OTObject) {
	state--;
	if(state < 1) {
		isGrounded = false;
		state = 0;
	}
}
