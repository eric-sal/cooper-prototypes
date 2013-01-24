#pragma strict

public static var WALK_SPEED : float = 150;
public static var JUMP_SPEED : float = 300;

private var _character : Character;
private var _sprite : OTAnimatingSprite;
private var _startingPosition : Vector2;	// this is the location where the player respawns

public var score : int = 0;
public var lives : int = 3;
public var coins : int = 0;

// Use this for initialization of the player
function Start() {
	_sprite = GetComponent(OTAnimatingSprite);
	_sprite.ShowFrame(6);	// ensure we're looking right
	_startingPosition = _sprite.position;

	_character = GetComponent(Character);
	_character.SetWalkSpeed(WALK_SPEED);
	_character.SetJumpSpeed(JUMP_SPEED);
}

function OnEnterBottomBounds() {
	lives -= 1;
	_character.SetIsDead(true);
}

function Respawn() {
	_character.SetIsDead(false);
	_sprite.ShowFrame(6);
	_sprite.position = _startingPosition;
}
