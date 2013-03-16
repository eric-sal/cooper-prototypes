#pragma strict

private var _facing : Vector2;	// the direction the character is facing
private var _isDead : boolean = false;

function FaceRight() {
	_facing = Vector2.right;
}

function FaceLeft() {
	_facing = -Vector2.right;
}

function IsFacingRight() : boolean {
	return _facing == Vector2.right;
}

function IsFacingLeft() : boolean {
	return !IsFacingRight();
}

function SetIsDead(isDead : boolean) {
	_isDead = isDead;
}

function IsDead() {
	return _isDead;
}
