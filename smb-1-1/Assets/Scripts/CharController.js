/*
This script was named CharacterController but Unity says
something else already has this name.

By default, this is a "null controller" that only updates
the character's position due to outside forces.  This class
should be inherited from.
*/
#pragma strict

protected var _character : Character;
protected var _horizontalMultiplier : float = 0.0;
protected var _lastVelocity : Vector2 = Vector2(0.0, 0.0);

private var _colliderBoundsOffsetX : float;
private var _colliderBoundsOffsetY : float;
private var _skinThickness : float = 0.01;

function Start() {
	_character = this.GetComponent(Character);
	_colliderBoundsOffsetX = _character.rigidbody.collider.bounds.extents.x;
	_colliderBoundsOffsetY = _character.rigidbody.collider.bounds.extents.y;
}

function FixedUpdate() {

	// undo last horizontal velocity applied
	_character.AddVelocity(Vector2(_lastVelocity.x * -1, 0));

	// apply current horizontal velocity
	_character.AddVelocity(Vector2(_character.walkSpeed * _horizontalMultiplier, 0));	

	if (_horizontalMultiplier > 0) {
		_character.FaceRight();
	} else if (_horizontalMultiplier < 0) {
		_character.FaceLeft();
	}
		
	// adjust velocity based on collisions (if any)
	var dt : float = Time.deltaTime;
	_character.ApplyGravity(dt);
	_character.SetVelocity(this.CollisionCheck(dt));	

	// move the character
	var v : Vector2 = _character.GetVelocity();
	var p : Vector2 = _character.GetPosition();
	p.x += v.x * dt;
	p.y += v.y * dt;
	_character.SetPosition(p);	

	_lastVelocity = v;
}

/*
Determines if the character will collide with something at their current
velocity.  If so, will return a new vector to apply instead that will
prevent collisions.
*/
function CollisionCheck(deltaTime : float) : Vector2 {
	var characterVelocity : Vector2 = _character.GetVelocity();
	var origin : Vector3 = _character.rigidbody.position;
	var direction : Vector3 = Vector3(characterVelocity.x, 0, 0).normalized;
	var distance : float;
	var absoluteDistance : float;
	var hitInfo : RaycastHit;
	
	var newPosition : Vector2 = _character.GetPosition();

	// horizontal rays
	if (direction.x != 0) {	// if we're not moving horizontally, then don't cast any rays
		var rayOffsetY = Vector3(0, _colliderBoundsOffsetY - _skinThickness, 0);
		distance = characterVelocity.x * deltaTime;
		absoluteDistance = Mathf.Abs(distance) + _colliderBoundsOffsetX + _skinThickness;

		if (Physics.Raycast(origin + rayOffsetY, direction, hitInfo, absoluteDistance) ||
			Physics.Raycast(origin - rayOffsetY, direction, hitInfo, absoluteDistance) ||
			Physics.Raycast(origin, direction, hitInfo, absoluteDistance)) {
			// adjust horizontal velocity to prevent collision
			characterVelocity.x = 0;			

			if (direction == Vector3.right) {
				newPosition.x += hitInfo.distance - _colliderBoundsOffsetX;
			} else {
				newPosition.x -= hitInfo.distance - _colliderBoundsOffsetX;
			}					
		}
		else {
			// we didn't have a horizontal collision, so offset the vertical rays by the amount the character moved
			origin.x += distance;
		}
	}

	// veritcal rays	
	var rayOffsetX = Vector3(_colliderBoundsOffsetX - _skinThickness, 0, 0);
	direction = Vector3(0, characterVelocity.y, 0).normalized;
	distance = characterVelocity.y * deltaTime;	
	absoluteDistance = Mathf.Abs(distance) + _colliderBoundsOffsetY + _skinThickness;	

	if (Physics.Raycast(origin + rayOffsetX, direction, hitInfo, absoluteDistance) ||
		Physics.Raycast(origin - rayOffsetX, direction, hitInfo, absoluteDistance) ||
		Physics.Raycast(origin, direction, hitInfo, absoluteDistance)) {
		// adjust vertical velocity to prevent collision
		characterVelocity.y = 0;

		if (direction == Vector3.up) {
			// bumped our head
			newPosition.y += hitInfo.distance - _colliderBoundsOffsetY;
		} else {
			// hit the gound
			_character.OnEventCollideWithGround();
			newPosition.y -= hitInfo.distance - _colliderBoundsOffsetY;
		}
	} else {		
		_character.isGrounded = false;
	}
	
	_character.SetPosition(newPosition);

	return characterVelocity;
}