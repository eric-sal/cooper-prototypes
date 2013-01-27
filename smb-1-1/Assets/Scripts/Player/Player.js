#pragma strict

private var _character : Character;
private var _sprite : OTAnimatingSprite;
private var _startingPosition : Vector2;	// this is the location where the player respawns

public var walkSpeed : float = 150;
public var jumpSpeed : float = 300;

public var score : int = 0;
public var lives : int = 3;
public var coins : int = 0;

// Use this for initialization of the player
function Start() {
	_sprite = GetComponent(OTAnimatingSprite);
	_sprite.ShowFrame(6);	// ensure we're looking right
	_startingPosition = _sprite.position;

	_character = GetComponent(Character);
	_character.FaceRight();
	
	var characterController : CharacterController2D = GetComponent(CharacterController2D);
	characterController.SetWalkSpeed(walkSpeed);
	characterController.SetJumpSpeed(jumpSpeed);
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
