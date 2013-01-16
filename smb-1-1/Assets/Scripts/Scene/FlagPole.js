#pragma strict

private var _sprite : OTSprite;

function Start() {
	_sprite = GetComponent(OTSprite);
	_sprite.InitCallBacks(this);
}

public function OnCollision(owner : OTObject) {
	var player : Player = owner.collisionObject.GetComponent(Player);
	if (player) {
		var flag : GameObject = GameObject.Find('Flag');
		iTween.MoveTo(flag, { 'y': -80, 'easetype': 'linear', 'speed': 120 });
		
		player.SetVelocity(Vector2(0, 0));
		iTween.MoveTo(player.gameObject, { 'y': -80, 'easetype': 'linear', 'speed': 120 });
	}
}
