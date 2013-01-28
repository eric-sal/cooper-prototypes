#pragma strict

public var walkSpeed : float = 150;
public var jumpSpeed : float = 300;

private var _playerInputDisabled : boolean = false;
private var _character : Character;
private var _characterController : CharacterController2D;
private var _player : Player;
private var _sprite : OTAnimatingSprite;

// called once in the lifetime of the script
function Awake() {
	_character = GetComponent(Character);
	_characterController = GetComponent(CharacterController2D);
	
	_player = GetComponent(Player);
}

// Use this for initialization
function Start() {
	_sprite = GetComponent(OTAnimatingSprite);
	_characterController.SetWalkSpeed(walkSpeed);
	_characterController.SetJumpSpeed(jumpSpeed);
}

/*
Detect user input.
Called once per frame.
*/
function Update() {
	if (!_playerInputDisabled) {
		// Get the user input
		_characterController.SetHorizontal(Input.GetAxis("Horizontal")); // -1.0 to 1.0
	
		// this will do nothing if the player is already jumping
		if (!_characterController.IsJumping() && Input.GetButtonDown("Jump")) {
			_characterController.OnEventJump(1);
		}
	}
}

// Called when this object collides with something
function OnEventCollision(args : Hashtable) {
	var otherCollider : Collider = args['collider'];
	var normal : Vector3 = args['normal'];

	if (normal == Vector3.up) {	// if we hit the top of something...
		var goomba : Goomba = otherCollider.GetComponent(Goomba);
		if (goomba) {	// ...and it was a Goomba (should create Enemy script change to Enemy)
			// give the player points
			_player.AddPoints(goomba.GetPointValue());

			// bounce him off of the enemy
			_characterController.OnEventJump(0.5);
		}
	}
}

// Called when something else runs into this object
function OnEventHit(args : Hashtable) {
}

// I'm not sure the PlayerController script is the best place for this, but since
// we take control of the character and move them around, I feel like this must be
// the best place. Maybe the PlayerAnimation script? Maybe a separate script?
function LevelComplete() {
	// Disable player movement, slide them down the pole, and move them to the castle.
	_sprite.ShowFrame(3);
	_sprite.position.x += 4;	// for a better snap to the pole
	_playerInputDisabled = true;
	_characterController.SetVelocity(Vector2.zero);
	iTween.MoveTo(gameObject, { 'y': -80, 'easetype': 'linear', 'speed': 150, 'oncomplete': 'WalkRight' });
}

// Automatically start the player moving to the right.
function WalkRight() {
	_characterController.SetHorizontal(0.5);
}