#pragma strict

private var _character : Character;

private var _sprite : Sprite;
private var _horizontal : float;
private var _velocity : Vector2;
private var _lastVelocity : Vector2;

private var _colliderBoundsOffsetX : float;
private var _colliderBoundsOffsetY : float;
private var _skinThickness : float = 0.01;

private var _isWalking : boolean;
private var _isJumping : boolean;
private var _walkSpeed : int;
private var _jumpSpeed : int;

private var _transform : Transform;

var isGrounded : boolean;

// called once in the lifetime of the script
function Awake() {
	_character = GetComponent(Character);
	_colliderBoundsOffsetX = collider.bounds.extents.x;
	_colliderBoundsOffsetY = collider.bounds.extents.y;
	
	// set these during initialization to ensure that the values are
	// properly set when a character is instantiated.
	_velocity = Vector2.zero;
	_lastVelocity = _velocity;
	_horizontal = 0;
	_isWalking = false;
	_isJumping = false;
	isGrounded = false;
}

// Use this for initialization
function Start() {
	_sprite = GetComponent(Sprite);
	_transform = transform;
}

/*
Update player position.
Called at fix intervals.
*/
function FixedUpdate() {
	ApplyGravity();

	// horizontal direction has changed, undo last velocity applied
	AddVelocity(Vector2(_lastVelocity.x * -1, 0));

	// apply velocity in new direction
	AddVelocity(Vector2(_walkSpeed * _horizontal, 0));

	var absHorizontalVelocity = Mathf.Abs(_velocity.x);
	_isWalking = !_isJumping && absHorizontalVelocity > 0.1 && absHorizontalVelocity >= Mathf.Abs(_lastVelocity.x);

	if (_horizontal > 0) {
		_character.FaceRight();
	} else if (_horizontal < 0) {
		_character.FaceLeft();
	}
	
	// adjust velocity based on collisions (if any)
	var dt : float = Time.deltaTime;
	CollisionCheck(dt);

	// move the player
	_transform.position.x += _velocity.x * dt;
	_transform.position.y += _velocity.y * dt;
	
	_lastVelocity = _velocity;
}

/*
Determines if the player will collide with something at their current
velocity. If so, will adjust character velocity that will prevent collisions.
*/
function CollisionCheck(deltaTime : float) {
	var origin : Vector3 = collider.bounds.center;
	var direction : Vector3 = Vector3(_velocity.x, 0, 0).normalized;
	var distance : float;
	var absoluteDistance : float;
	var hitInfo : RaycastHit;
	
	// horizontal rays
	if (_velocity.x != 0) {	// if we're not moving horizontally, then don't cast any rays
		var rayOffsetY = Vector3(0, _colliderBoundsOffsetY - _skinThickness, 0);
		distance = _velocity.x * deltaTime;
		absoluteDistance = Mathf.Abs(distance) + _colliderBoundsOffsetX + _skinThickness;
		
		if (Physics.Raycast(origin + rayOffsetY, direction, hitInfo, absoluteDistance) ||
			Physics.Raycast(origin - rayOffsetY, direction, hitInfo, absoluteDistance) ||
			Physics.Raycast(origin, direction, hitInfo, absoluteDistance)) {
			// adjust horizontal velocity to prevent collision
			_velocity.x = 0;
	
			if (direction == Vector3.right) {
				_transform.position.x += hitInfo.distance - _colliderBoundsOffsetX;
			} else {
				_transform.position.x -= hitInfo.distance - _colliderBoundsOffsetX;
			}
			
			SendMessage('OnEventCollision', { 'collider': hitInfo.collider, 'normal': hitInfo.normal }, SendMessageOptions.DontRequireReceiver);	// Let this GameObject know we hit something
			hitInfo.collider.SendMessage("OnEventCollision", { 'collider': collider, 'normal': hitInfo.normal }, SendMessageOptions.DontRequireReceiver);	// let the object we hit know that it got hit
		} else {
			// we didn't have a horizontal collision, so offset the vertical rays by the amount the player moved
			origin.x += distance;
		}
	}
	
	// veritcal rays
	var rayOffsetX = Vector3(_colliderBoundsOffsetX - _skinThickness, 0, 0);
	
	// if the player is not currently traveling in the y direction, always be checking to see if we're on the ground
	direction = (_velocity.y == 0) ? -Vector3.up : Vector3(0, _velocity.y, 0).normalized;
	distance = _velocity.y * deltaTime;
	absoluteDistance = Mathf.Abs(distance) + _colliderBoundsOffsetY + _skinThickness;
	
	if (Physics.Raycast(origin + rayOffsetX, direction, hitInfo, absoluteDistance) ||
		Physics.Raycast(origin - rayOffsetX, direction, hitInfo, absoluteDistance) ||
		Physics.Raycast(origin, direction, hitInfo, absoluteDistance)) {
		// adjust vertical velocity to prevent collision
		_velocity.y = 0;

		if (direction == Vector3.up) {
			// bumped our head
			_transform.position.y += hitInfo.distance - _colliderBoundsOffsetY;
		} else {
			// hit the gound
			OnEventLand();
			_transform.position.y -= hitInfo.distance - _colliderBoundsOffsetY;
		}

		SendMessage('OnEventCollision', { 'collider': hitInfo.collider, 'normal': hitInfo.normal }, SendMessageOptions.DontRequireReceiver);	// Let this GameObject know we hit something
		hitInfo.collider.SendMessage("OnEventCollision", { 'collider': collider, 'normal': hitInfo.normal }, SendMessageOptions.DontRequireReceiver);	// let the object we hit know that it got hit
	} else {
		isGrounded = false;
	}
}

/*
Calculate new player velocities based on gravity.
Called at a fixed interval independent of framerate.
*/
function ApplyGravity() {
	var y : float = SceneController.GRAVITY * Time.deltaTime;
	if (isGrounded) {
		y = 0.0;
	}

	AddVelocity(Vector2(0.0, y));
}

function SetWalkSpeed(speed : int) {
	_walkSpeed = speed;
}

function SetJumpSpeed(speed : int) {
	_jumpSpeed = speed;
}

function GetHorizontal() : float {
	return _horizontal;
}

function SetHorizontal(horizontal : float) {
	_horizontal = horizontal;
}

function IsWalking() : boolean {
	return _isWalking;
}

function IsMoving() : boolean {
	return _velocity.sqrMagnitude != 0;
}

function AddVelocity(v : Vector2) {
	_velocity.x += v.x;
	_velocity.y += v.y;
}

function SetVelocity(v : Vector2) {
	_velocity = v;
}

// Come to a complete stop.
function StopMoving() {
	_horizontal = 0;
	_velocity = Vector2.zero;
}

function IsJumping() : boolean {
	return _isJumping;
}

function OnEventJump(multiplier : float) {
	// we can only jump if we're not already jumping or falling
	// or if we have *just* walked off a ledge
	if (Mathf.Abs(_velocity.y) <= 30) {
		_isJumping = true;
		// the controller will stop us when appropriate
		_velocity.y += _jumpSpeed * multiplier;
	}
}

function OnEventLand() {
	isGrounded = true;
	_isJumping = false;
}
