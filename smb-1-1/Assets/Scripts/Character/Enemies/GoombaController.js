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
	var otherCollider : Collider = args['collider'];
	var player : Player = otherCollider.GetComponent(Player);
	var normal : Vector3 = args['normal'];

	if (Mathf.Abs(normal.x) > 0) {
		if (player) {
			player.Kill();
		} else if (!player && normal.x != _characterController.GetHorizontal()) {
			// when the Goomba collides with something, send it back in the opposite direction
			_characterController.SetHorizontal(normal.x);
		}
	}
}
