#pragma strict

private var _playerInputDisabled : boolean = false;
private var _player : Player;
private var _sprite : OTAnimatingSprite;
private var _horizontal : float = 0.0;
private var _lastVelocity : Vector2 = Vector2(0.0, 0.0);

private var _colliderBoundsOffsetX : float;
private var _colliderBoundsOffsetY : float;
private var _skinThickness : float = 0.01;

// called once in the lifetime of the script
function Awake() {
	_player = this.GetComponent(Player);
	_colliderBoundsOffsetX = _player.rigidbody.collider.bounds.extents.x;
	_colliderBoundsOffsetY = _player.rigidbody.collider.bounds.extents.y;
}

// Use this for initialization
function Start() {
	// This doesn't work if it's in Awake()?
	_sprite = _player.GetSprite();
}

/*
Detect user input.
Called once per frame.
*/
function Update() {
	if (!_playerInputDisabled) {
		// Get the user input
		_horizontal = Input.GetAxis("Horizontal"); // -1.0 to 1.0
	
		if (Input.GetButtonDown("Jump")) {
			// this will do nothing if the player is already jumping
			_player.OnEventJump();
		}
	}
}

/*
Update player position.
Called at fix intervals.
*/
function FixedUpdate() {
	// horizontal direction has changed, undo last velocity applied
	_player.AddVelocity(Vector2(_lastVelocity.x * -1, 0));

	// apply velocity in new direction
	_player.AddVelocity(Vector2(Player.WALK_SPEED * _horizontal, 0));

	//TODO: Use OnWalk and OnStop instead
	var absHorizontalVelocity = Mathf.Abs(_player.GetVelocity().x);
	_player.SetIsWalking(!_player.IsJumping() && absHorizontalVelocity > 0.1 && absHorizontalVelocity >= Mathf.Abs(_lastVelocity.x));

	if (_horizontal > 0) {
		_player.FaceRight();
	} else if (_horizontal < 0) {
		_player.FaceLeft();
	}
	
	// adjust velocity based on collisions (if any)
	var dt : float = Time.deltaTime;
	_player.SetVelocity(CollisionCheck(dt));

	// move the player
	var v : Vector2 = _player.GetVelocity();
	_sprite.position.x += v.x * dt;
	_sprite.position.y += v.y * dt;
	
	_lastVelocity = v;
}

/*
Determines if the player will collide with something at their current
velocity.  If so, will return a new vector to apply instead that will
prevent collisions.
*/
function CollisionCheck(deltaTime : float) : Vector2 {
	var playerVelocity : Vector2 = _player.GetVelocity();
	var origin : Vector3 = _player.rigidbody.position;
	var direction : Vector3 = Vector3(playerVelocity.x, 0, 0).normalized;
	var distance : float;
	var absoluteDistance : float;
	var hitInfo : RaycastHit;
	
	// horizontal rays
	if (playerVelocity.x != 0) {	// if we're not moving horizontally, then don't cast any rays
		var rayOffsetY = Vector3(0, _colliderBoundsOffsetY - _skinThickness, 0);
		distance = playerVelocity.x * deltaTime;
		absoluteDistance = Mathf.Abs(distance) + _colliderBoundsOffsetX + _skinThickness;
		
		if (Physics.Raycast(origin + rayOffsetY, direction, hitInfo, absoluteDistance) ||
			Physics.Raycast(origin - rayOffsetY, direction, hitInfo, absoluteDistance) ||
			Physics.Raycast(origin, direction, hitInfo, absoluteDistance)) {
			// adjust horizontal velocity to prevent collision
			playerVelocity.x = 0;
	
			if (direction == Vector3.right) {
				_sprite.position.x += hitInfo.distance - _colliderBoundsOffsetX;
			} else {
				_sprite.position.x -= hitInfo.distance - _colliderBoundsOffsetX;
			}
		} else {
			// we didn't have a horizontal collision, so offset the vertical rays by the amount the player moved
			origin.x += distance;
		}
	}
	
	// veritcal rays
	var rayOffsetX = Vector3(_colliderBoundsOffsetX - _skinThickness, 0, 0);
	
	// if the player is not currently traveling in the y direction, always be checking to see if we're on the ground
	direction = (playerVelocity.y == 0) ? -Vector3.up : Vector3(0, playerVelocity.y, 0).normalized;
	distance = playerVelocity.y * deltaTime;
	absoluteDistance = Mathf.Abs(distance) + _colliderBoundsOffsetY + _skinThickness;
	
	if (Physics.Raycast(origin + rayOffsetX, direction, hitInfo, absoluteDistance) ||
		Physics.Raycast(origin - rayOffsetX, direction, hitInfo, absoluteDistance) ||
		Physics.Raycast(origin, direction, hitInfo, absoluteDistance)) {
		// adjust vertical velocity to prevent collision
		playerVelocity.y = 0;

		if (direction == Vector3.up) {
			// bumped our head
			_sprite.position.y += hitInfo.distance - _colliderBoundsOffsetY;
			
			// let the object we hit know that we hit the bottom of it
			hitInfo.collider.SendMessage("OnEventBottomHit");
		} else {
			// hit the gound
			_player.OnEventLand();
			_sprite.position.y -= hitInfo.distance - _colliderBoundsOffsetY;
		}
	} else {
		_player.isGrounded = false;
	}
	
	return playerVelocity;
}

// I'm not sure the PlayerController script is the best place for this, but since
// we take control of the character and move them around, I feel like this must be
// the best place. Maybe the PlayerAnimation script? Maybe a separate script?
function LevelComplete() {
	// Disable player movement, slide them down the pole, and move them to the castle.
	_sprite.ShowFrame(3);
	_sprite.position.x += 4;	// for a better snap to the pole
	_playerInputDisabled = true;
	_player.SetVelocity(Vector2(0, 0));
	iTween.MoveTo(gameObject, { 'y': -80, 'easetype': 'linear', 'speed': 150, 'oncomplete': 'WalkRight' });
}

// Automatically start the player moving to the right.
function WalkRight() {
	_horizontal = 0.5;
}

// Come to a complete stop.
function StopMoving() {
	_horizontal = 0;
	_player.SetVelocity(Vector2(0, 0));
}
