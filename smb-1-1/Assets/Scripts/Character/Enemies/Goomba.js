#pragma strict

// NOTES TO SELF:
// 	1. Enemies should not be instantiated until the player gets near the enemy's starting position.
//	   Starting positions can probably be stored in a Hashtable in SceneController.js, and that script
//	   can probably handle spawning the enemies when necessary.
//	2. Create Enemy.js and EnemyController.js scripts for generic enemy behavior.
public var pointValue : int = 100;

private var _characterController : CharacterController2D;
private var _sprite : OTAnimatingSprite;

function Start() {
	_characterController = GetComponent(CharacterController2D);
	_sprite = GetComponent(OTAnimatingSprite);
}

function GetPointValue() : int {
	return pointValue;
}

function Kill() {
	// stop and squash the goomba
	_characterController.StopMoving();
	_sprite.Stop();
	_sprite.ShowFrame(0);

	// disable the collider so that nothing else can run into it
	collider.enabled = false;

	// destroy gameobject after 1 second
	Destroy(gameObject, 1);
}

function OnEnterBottomBounds() {
	Destroy(gameObject);
}
