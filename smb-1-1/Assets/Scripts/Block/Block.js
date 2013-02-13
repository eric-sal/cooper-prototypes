#pragma strict

// when a block is hit from the bottom, how many pixels does it get displaced?
public var springiness : int = 0;
public var disabled : boolean = false;

private var _sprite : OTSprite;
private var _startingPosition : Vector2;

function Start() {
	_sprite = GetComponent(OTSprite);
	_startingPosition = _sprite.position;
}

function OnEventCollision(args : Hashtable) {
	var otherCollider : Collider = args['collider'];
	var player : Player = otherCollider.GetComponent(Player);
	var normal : Vector3 = args['normal'];

	if (normal == -Vector3.up && player) {	// the bottom of this object got hit
		if (!disabled) {
			if (springiness > 0) {
				var currentPosition : Vector3 = _sprite.position;
				var apex : Vector3 = currentPosition + (Vector3.up * springiness);
				iTween.MoveTo(gameObject, { 'path': [apex, currentPosition], 'easetype': 'linear', 'time': 0.15 });
			}
		}
	}
}

function StartingPosition() {
	return _startingPosition;
}

function Disable() {
	disabled = true;
	_sprite.frameIndex = 19;
}
