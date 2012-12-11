private var _player : Player;
private var _lastHorizontal : float = 0.0;
private var _lastVertical : float = 0.0;
private var _lastVelocity : Vector2 = Vector2(0.0, 0.0);

// Use this for initialization
function Start() {
	_player = this.GetComponent(Player);
	// The line above is equivalent to: player = GameObject.Find('Player').GetComponent(Player);
	// However, since this script (PlayerController) is added as a component to the 'Player' Prefab instance
	// in the unity editor, the GameObject.Find('Player') bit is unnecessary. We're already in the GameObject.
}

/*
Detect user input and update player position.
Called once per frame.
*/
function FixedUpdate() {

	// Get the user input
	var hitJump : boolean = Input.GetButtonDown("Jump");
	var horizontal : float = Input.GetAxis("Horizontal"); // -1.0 to 1.0

	// horizontal direction has changed, undo last velocity applied
	_player.AddVelocity(Vector2(_lastVelocity.x * -1, 0));

	// apply velocity in new direction
	_player.AddVelocity(Vector2(Player.WALK_SPEED * horizontal, 0));

	//TODO: Use OnWalk and OnStop instead
	var absHorizontalVelocity = Mathf.Abs(_player.GetVelocity().x);
	_player.SetIsWalking(!_player.IsJumping() && absHorizontalVelocity > 0.1 && absHorizontalVelocity >= Mathf.Abs(_lastVelocity.x));

	if (horizontal > 0) {
		_player.FaceRight();
	}
	else if (horizontal < 0) {
		_player.FaceLeft();
	}
	
	if (hitJump) {
		// this will do nothing if the player is already jumping
		_player.OnJump();
	}
	
	// adjust velocity based on collisions (if any)
	var dt : float = Time.deltaTime;
	var wasFalling : boolean = _player.GetVelocity().y != 0;
	_player.SetVelocity(CollisionCheck(dt));
	
	// clamp tiny velocities in the X direction to 
	// prevent slowly merging through walls
	var v : Vector2 = _player.GetVelocity();
	if (Mathf.Abs(v.x) <= 0.2) {
		v.x = 0;
	}
	
	if (v.y == 0 && wasFalling) {
		_player.OnLand();
	}
	
	// move the player
	var sprite : OTAnimatingSprite = _player.GetSprite();
	sprite.position.x += v.x * dt;
	sprite.position.y += v.y * dt;
	
	_lastVelocity = v;
}

/*
Determines if the player will collide with something at their current
velocity.  If so, will return a new vector to apply instead that will
prevent collisions.
*/
function CollisionCheck(deltaTime : float) : Vector2 {
	
	// TODO: Seperate checks for head and feet
	var playerVelocity : Vector2 = _player.GetVelocity();
	if (playerVelocity.magnitude == 0) {
		// player is not moving
		return playerVelocity;
	}
	
	// horizontal ray
	var origin : Vector3 = _player.rigidbody.position;
	origin.y -= 0.1; // fudge factor for testing
	var direction : Vector3 = Vector3(playerVelocity.x, 0.0, 0.0);
	var distance : float = playerVelocity.x * deltaTime;
	var absoluteDistance : float = Mathf.Abs(distance);
	if (distance < 0) {
		origin.x -= _player.rigidbody.collider.bounds.extents.x;
	}
	else {
		origin.x += _player.rigidbody.collider.bounds.extents.x;
	}
	Debug.DrawLine(origin, Vector3(origin.x + distance, origin.y, origin.z), Color.green, .25);
	
	var hitInfo : RaycastHit;
	if (Physics.Raycast(origin, direction, hitInfo, absoluteDistance)) {
		Debug.Log("Horizontal Collision");
		// adjust horizontal velocity to prevent collision
		if (distance > 0) {
			playerVelocity.x = hitInfo.distance / deltaTime * .99;
		}
		else {
			playerVelocity.x = hitInfo.distance / deltaTime * -.99;
		}
	}
	
	// veritcal rays
	// TODO: Seperate checks for shoulders
	origin = _player.rigidbody.position;
	direction = Vector3(0.0, playerVelocity.y, 0.0);
	distance = playerVelocity.y * deltaTime;
	absoluteDistance = Mathf.Abs(distance);
	if (distance < 0) {
		origin.y -= _player.rigidbody.collider.bounds.extents.y - 0.02; // a little fudge factor
	}
	else {
		origin.y += _player.rigidbody.collider.bounds.extents.y;
	}
	Debug.DrawLine(origin, Vector3(origin.x, origin.y + distance, origin.z), Color.magenta, .25);
	
	if (Physics.Raycast(origin, direction, hitInfo, absoluteDistance)) {
		// adjust vertical velocity to prevent collision
		
		if (distance > 0) {
			// bumped our head
			Debug.Log("Vertical Collision");
			playerVelocity.y = hitInfo.distance / deltaTime * .99;
		}
		else {
			// hit the gound, just use 0 to prevent constant bounciness
			playerVelocity.y = 0;
		}
	}
	
	return playerVelocity;
}
