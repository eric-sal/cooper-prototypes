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

// Considered using the Orthello 2d OnCollision callback, but we can't tell what side of the 
// object was struck - whether it was the top or bottom. And I couldn't get the Unity 3d
// OnCollisionEnter callback to fire. Decided on using Component.SendMessage to send the message
// from the PlayerController to whichever object it hit.
function OnEventBottomHit() {
	if (!disabled) {
		if (springiness > 0) {
			var currentPosition : Vector3 = _sprite.position;
			var apex : Vector3 = currentPosition + (Vector3.up * springiness);
			iTween.MoveTo(gameObject, { 'path': [apex, currentPosition], 'easetype': 'linear', 'time': 0.15 });
		}
	}
}

function GetStartingPosition() {
	return _startingPosition;
}

function Disable() {
	disabled = true;
	_sprite.frameIndex = 19;
}
