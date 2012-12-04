// constants
public static var TO_THE_LEFT : int = -1;
public static var TO_THE_RIGHT : int = 1;

// public instance vars
var isMoving : boolean = false;
var jumpHeight : float = 0.2;
var moveSpeed : float = 5;

// private instance vars
private var sprite : OTAnimatingSprite;
private var directionX : int = TO_THE_RIGHT;
private var isGrounded : boolean = true;
private var isJumping : boolean = false;
private var reachedJumpApex : boolean = false;
private var verticalSpeed : float = 0.0;

// starting location
private var startingPosition : Vector2;


// Use this for initialization
function Start () {
	sprite = GetComponent(OTAnimatingSprite);
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
	sprite.position.y = startingPosition.y;	// snap to the ground
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

function UpdateRaycasts() {
	var hit : RaycastHit;

	// is the player is standing on the ground?
	// cast 2 rays, one on each side of the character
	var leftSideRay : Vector3 = new Vector3(transform.position.x - 0.3f, transform.position.y, transform.position.z);
	var rightSideRay : Vector3 = new Vector3(transform.position.x + 0.3f, transform.position.y, transform.position.z);
	
	// Debug.DrawRay(leftSideRay, -Vector3.up, Color.green, 0, true);
	// Debug.DrawRay(rightSideRay, -Vector3.up, Color.yellow, 0, true);
	
	isGrounded = (Physics.Raycast(leftSideRay, -Vector3.up, hit, 0.7f, SceneController.GROUND_MASK) || Physics.Raycast(rightSideRay, -Vector3.up, hit, 0.7f, SceneController.GROUND_MASK));
}
