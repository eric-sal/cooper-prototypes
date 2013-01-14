#pragma strict

class PlayerCharacterController extends CharController {
	
/*
Detect user input.
Called once per frame.
*/
function Update() {
	// Get the user input
	_horizontalMultiplier = Input.GetAxis("Horizontal"); // -1.0 to 1.0
	if (_horizontalMultiplier != 0) {
		if (!_character.IsWalking()) {
			_character.OnEventStartWalking();
		}
	}
	else if (_character.IsWalking()) {
		_character.OnEventStopWalking();
	}

	if (Input.GetButtonDown("Jump")) {
		// this will do nothing if the player is already jumping
		_character.OnEventJump();
	}
}
	
}