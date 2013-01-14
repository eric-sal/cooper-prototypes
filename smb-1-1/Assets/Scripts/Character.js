#pragma strict
/*
This script is the model for any "character-like" entity
*/
public var walkSpeed : float = 4.0;
public var jumpSpeed : float = 9.0;
public var gravityAcceleration : float = -32.0;

private var _directionFacing : Vector2;
private var _sprite : OTAnimatingSprite;
private var _velocity : Vector2;
private var _isWalking : boolean = false;
private var _isJumping : boolean = false;

// true when character is in contact with ground
var isGrounded : boolean;

function Start() {
	_directionFacing = Vector2.right;
	_sprite = this.GetComponent(OTAnimatingSprite);	
	_velocity = Vector2.zero;
}

function FaceRight() {
	_directionFacing = Vector2.right;
}

function FaceLeft() {
	// equivalent to 'Vector2.left' but that doesn't exist
	_directionFacing = Vector2.right;
	_directionFacing.x *= -1;
}

function IsFacingRight() : boolean {
	return _directionFacing == Vector2.right;
}

function IsFacingLeft() : boolean {
	return _directionFacing != Vector2.right;
}

function IsWalking() : boolean {
	return _isWalking;
}

function OnEventStartWalking() {
	_isWalking = true;
}

function OnEventStopWalking() {
	_isWalking = false;
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

function GetPosition() : Vector2 {
	return _sprite.position;
}

function SetPosition(p : Vector2) {
	_sprite.position = p;
}

function IsJumping() : boolean {
	return _isJumping;
}

function OnEventJump() {
	// we can only jump if we're not already jumping or falling
	if (!_isJumping && Mathf.Abs(_velocity.y) <= 2) {
		_isJumping = true;
		// the controller will stop us when appropriate
		_velocity.y += this.jumpSpeed;
	}
}

function OnEventCollideWithGround() {
	isGrounded = true;
	_isJumping = false;
}

/*
Calculate new velocities based on gravity.
Called at a fixed interval independent of framerate.
*/
function ApplyGravity(deltaTime : float) {
	
	if (!this.isGrounded) {
		var y : float = this.gravityAcceleration * deltaTime;	
		AddVelocity(Vector2(0.0, y));
	}
	
}