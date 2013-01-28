#pragma strict

private var _goomba : Goomba;
private var _characterController : CharacterController2D;
private var _sprite : OTAnimatingSprite;

public var walkSpeed : float = 30;
public var jumpSpeed : float = 0;

function Start() {
	_goomba = GetComponent(Goomba);
	
	_sprite = GetComponent(OTAnimatingSprite);

	_characterController = GetComponent(CharacterController2D);
	_characterController.SetWalkSpeed(walkSpeed);
	_characterController.SetJumpSpeed(jumpSpeed);
	_characterController.SetHorizontal(-1);	// start the goomba walking left
}

// Called when this object collides with something
function OnEventCollision(args : Hashtable) {
	var normal : Vector3 = args['normal'];

	if (Mathf.Abs(normal.x) > 0) {
		// when the Goomba collides with something, send it back in the opposite direction
		_characterController.SetHorizontal(normal.x);
	}
}

// Called when something else runs into this object
function OnEventHit(args : Hashtable) {
	var otherCollider : Collider = args['collider'];
	var normal : Vector3 = args['normal'];
	
	if (normal == Vector3.up) {	// if something hit the top of this...
		var player : Player = otherCollider.GetComponent(Player);
		if (player) {	// ...and it was the player
			// stop and squash the goomba
			_characterController.StopMoving();
			_sprite.Stop();
			_sprite.ShowFrame(0);
			
			// disable the collider so that nothing else can run into it
			collider.enabled = false;
			
			// destroy gameobject after 1 second
			Destroy(gameObject, 1);
		}
	}
}
