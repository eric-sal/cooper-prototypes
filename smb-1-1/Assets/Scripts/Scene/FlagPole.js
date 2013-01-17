#pragma strict

private var _sprite : OTSprite;

function Start() {
	_sprite = GetComponent(OTSprite);
	_sprite.InitCallBacks(this);
}

public function OnCollision(owner : OTObject) {
	var flag : GameObject = GameObject.Find('Flag');
	iTween.MoveTo(flag, { 'y': -80, 'easetype': 'linear', 'speed': 150 });
	
	// destroy the collider once we hit it, so we can move past it
	GameObject.Destroy(collider);

	// Do what we do when the level is completed
	owner.collisionObject.SendMessage('LevelComplete');
}
