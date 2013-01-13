#pragma strict
	
public static var MAX_OFFSET = 3;

public var disabled : boolean = false;

private var _sprite : OTSprite;
private var _startingPosition : Vector2;
private var _hit : boolean = false;

function Start () {
	_sprite = GetComponent(OTSprite);
	_startingPosition = _sprite.position;
}

// This is probably not the best way to animate the block moving.
// Also, this should probably be moved to BlockAnimation.js.
function Update() {
	var direction = _hit ? 1 : -1;
	
	if (_hit && _sprite.position.y >= _startingPosition.y + MAX_OFFSET) {
		_hit = false;
	}
	
	if (_hit || _sprite.position.y != _startingPosition.y) {
		_sprite.position.y += 1 * direction;
	}
}

// Considered using the Orthello 2d OnCollision callback, but we can't tell what side of the 
// object was struck - whether it was the top or bottom. And I couldn't get the Unity 3d
// OnCollisionEnter callback to fire. Decided on using Component.SendMessage to send the message
// from the PlayerController to whichever object it hit.
function BottomHit() {
	if (!disabled) {
		_hit = true;
	}
}

function GetSprite() {
	return _sprite;
}

function GetStartingPosition() {
	return _startingPosition;
}
