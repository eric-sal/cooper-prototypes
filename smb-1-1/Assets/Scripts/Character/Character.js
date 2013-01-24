#pragma strict

private var _walkSpeed : int;
private var _jumpSpeed : int;

// the direction the player is facing
private var _facing : Vector2;

private var _velocity : Vector2;
private var _isWalking : boolean = false;
private var _isJumping : boolean = false;
private var _isDead : boolean = false;

var isGrounded : boolean = false;

// Use this for initialization of the player
function Start() {
	_facing = Vector2.right;
	_velocity = Vector2.zero;
}

function GetWalkSpeed() : int {
	return _walkSpeed;
}

function SetWalkSpeed(speed : int) {
	_walkSpeed = speed;
}

function GetJumpSpeed() : int {
	return _jumpSpeed;
}

function SetJumpSpeed(speed : int) {
	_jumpSpeed = speed;
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

function GetIsWalking() : boolean {
	return _isWalking;
}

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

function OnEventJump() {
	// we can only jump if we're not already jumping or falling
	// or if we have *just* walked off a ledge
	if (!_isJumping && Mathf.Abs(_velocity.y) <= 50) {
		_isJumping = true;
		// the controller will stop us when appropriate
		_velocity.y += _jumpSpeed;
	}
}

function OnEventLand() {
	isGrounded = true;
	_isJumping = false;
}

function SetIsDead(isDead : boolean) {
	_isDead = isDead;
}

function IsDead() {
	return _isDead;
}

/*
Calculate new player velocities based on gravity.
Called at a fixed interval independent of framerate.
*/
function ApplyGravity() {
	var y : float = SceneController.GRAVITY * Time.deltaTime;
	if (isGrounded) {
		y = 0.0;
	}

	AddVelocity(Vector2(0.0, y));
}
