#pragma strict

public static var WALK_SPEED : float = 150;

private var _character : Character;

// Use this for initialization of the player
function Start() {
	_character = GetComponent(Character);
	_character.SetWalkSpeed(WALK_SPEED);
}
