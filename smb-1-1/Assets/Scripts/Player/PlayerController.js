#pragma strict

private var _playerInputDisabled : boolean = false;
private var _player : Player;
private var _characterController : CharacterController2D;
private var _sprite : OTAnimatingSprite;

// called once in the lifetime of the script
function Awake() {
	_player = GetComponent(Player);
	_characterController = GetComponent(CharacterController2D);
}

// Use this for initialization
function Start() {
	// This doesn't work if it's in Awake()?
	_sprite = GetComponent(OTAnimatingSprite);
}

/*
Detect user input.
Called once per frame.
*/
function Update() {
	if (!_playerInputDisabled) {
		// Get the user input
		_characterController.SetHorizontal(Input.GetAxis("Horizontal")); // -1.0 to 1.0
	
		if (Input.GetButtonDown("Jump")) {
			// this will do nothing if the player is already jumping
			_player.OnEventJump();
		}
	}
}

// I'm not sure the PlayerController script is the best place for this, but since
// we take control of the character and move them around, I feel like this must be
// the best place. Maybe the PlayerAnimation script? Maybe a separate script?
function LevelComplete() {
	// Disable player movement, slide them down the pole, and move them to the castle.
	_sprite.ShowFrame(3);
	_sprite.position.x += 4;	// for a better snap to the pole
	_playerInputDisabled = true;
	_player.SetVelocity(Vector2(0, 0));
	iTween.MoveTo(gameObject, { 'y': -80, 'easetype': 'linear', 'speed': 150, 'oncomplete': 'WalkRight' });
}

// Automatically start the player moving to the right.
function WalkRight() {
	_characterController.SetHorizontal(0.5);
}