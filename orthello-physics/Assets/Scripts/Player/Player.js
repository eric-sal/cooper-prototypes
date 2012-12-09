public static var WALK_SPEED = 7;
public static var JUMP_SPEED = 18;

private var _sprite : OTAnimatingSprite;

// this is the location where the player respawns
private var _startingPosition : Vector2;

// the direction the player is facing
private var _facing : Vector2;

private var _velocity : Vector2;
private var _isWalking : boolean = false;
private var _isJumping : boolean = false;

// Use this for initialization of the player
function Start() {
	_sprite = GetComponent(OTAnimatingSprite);
	_sprite.InitCallBacks(this);
	_startingPosition = _sprite.position;
	_facing = Vector2.right;
	_velocity = Vector2.zero;
}

function GetSprite() : OTAnimatingSprite {
	return _sprite;
}

function FaceRight() {
	_facing = Vector2.right;
}

function FaceLeft() {
	// equivalent to 'Vector2.left' but that doesn't exist
	_facing = Vector2.right;
	_facing.x *= -1;
}

function IsFacingRight() : boolean {
	return _facing == Vector2.right;
}

function IsFacingLeft() : boolean {
	return _facing != Vector2.right;
}

// TODO: Rename to IsWalking
function GetIsWalking() : boolean {
	return _isWalking;
}

// TODO: Use OnWalk and OnStop instead
function SetIsWalking(val : boolean) {
	_isWalking = val;
}

function IsMoving() : boolean {
	return _velocity.magnitude != 0;
}

function AddVelocity(v : Vector2) {
	_velocity.x += v.x;
	_velocity.y += v.y;
}

function GetVelocity() : Vector2 {
	return _velocity;
}

function SetVelocity(v : Vector2) {
	_velocity = v;
}

function IsJumping() : boolean {
	return _isJumping;
}

function OnJump() {
	// we can only jump if we're not already jumping or falling
	if (!_isJumping && Mathf.Abs(_velocity.y) <= 2) {
		_isJumping = true;
		// the controller will stop us when appropriate
		_velocity.y += JUMP_SPEED;
	}
}

function OnLand() {
	_isJumping = false;
};