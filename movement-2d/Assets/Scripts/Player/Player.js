// constants
public static var TO_THE_LEFT : int = -1;
public static var TO_THE_RIGHT : int = 1;

// class vars
public static var moveSpeed : float = 5;
public static var jumpHeight : float = 0.2;

// instance vars
var directionX : int = TO_THE_RIGHT;
var isGrounded : boolean = true;
var isMoving : boolean = false;
var isJumping : boolean = false;
var reachedJumpApex : boolean = false;
var verticalSpeed : float = 0.0;

// private instance vars
// testing the idea of private instance vars. here, the sprite
// var could only ber retrieved or set using instance methods.
private var sprite : OTAnimatingSprite;

// starting location
private var startingPosition : Vector2;

// raycasts
private var hit : RaycastHit;
private var leftSideRay : Vector3;
private var rightSideRay : Vector3;


// Use this for initialization
function Start () {
	sprite = GetComponent(OTAnimatingSprite);
	startingPosition = sprite.position;
}

// get private var sprite
function Sprite() : OTAnimatingSprite {
	return sprite;
}

// set private var sprite, and return the new sprite
function Sprite(newSprite : OTAnimatingSprite) : OTAnimatingSprite {
	sprite = newSprite;
	return sprite;
}

function Jump() {
	isGrounded = false;
	isJumping = true;
	reachedJumpApex = false;
	verticalSpeed = SceneController.CalculateJumpVerticalSpeed(jumpHeight);
}

function MakeGrounded() {
	isGrounded = true;
	isJumping = false;
	reachedJumpApex = false;
	verticalSpeed = 0.0;
	sprite.position.y = startingPosition.y;	// snap to the ground
}

function MoveLeft() {
	isMoving = true;
	Move(TO_THE_LEFT);
}

function MoveRight() {
	isMoving = true;
	Move(TO_THE_RIGHT);
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

function UpdateRaycasts() {
	// is the player is standing on the ground?
	// cast 2 rays, one on each side of the character
	leftSideRay = new Vector3(transform.position.x - 0.3f, transform.position.y, transform.position.z);
	rightSideRay = new Vector3(transform.position.x + 0.3f, transform.position.y, transform.position.z);
	
	// Debug.DrawRay(leftSideRay, -Vector3.up, Color.green, 0, true);
	// Debug.DrawRay(rightSideRay, -Vector3.up, Color.yellow, 0, true);
	
	isGrounded = (Physics.Raycast(leftSideRay, -Vector3.up, hit, 0.7f, SceneController.GROUND_MASK) || Physics.Raycast(rightSideRay, -Vector3.up, hit, 0.7f, SceneController.GROUND_MASK));
}
