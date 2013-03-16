#pragma strict

private var _character : Character;
private var _sprite : Sprite;
private var _startingPosition : Vector2;	// this is the location where the player respawns

public var score : int = 0;
public var lives : int = 3;
public var coins : int = 0;

// Use this for initialization of the player
function Start() {
	_sprite = GetComponent(Sprite);
	_startingPosition = transform.position;

	_character = GetComponent(Character);
	_character.FaceRight();
}

function AddPoints(points : int) {
	score += points;
}

function Kill() {
	lives -= 1;
	_character.SetIsDead(true);
}

function OnEnterBottomBounds() {
	Kill();
}

function Respawn() {
	_character.SetIsDead(false);
	_sprite.ShowFrame(6);
	transform.position = _startingPosition;
}
