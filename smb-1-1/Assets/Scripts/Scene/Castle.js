#pragma strict

private var _sprite : OTSprite;

function Start() {
	_sprite = GetComponent(OTSprite);
	_sprite.InitCallBacks(this);
}

public function OnCollision(owner : OTObject) {
	owner.collisionObject.SendMessage('StopMoving');
	// owner.collisionObject.SendMessage('Respawn');
}
