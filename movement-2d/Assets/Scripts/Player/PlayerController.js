private var player : Player;

// Use this for initialization
function Start () {
	player = GetComponent(Player);
	// The line above is equivalent to: player = GameObject.Find('player').GetComponent(Player);
	// However, since this script (PlayerController) is added as a component to the 'player' Prefab instance
	// in the unity editor, the GameObject.Find('player') bit is unnecessary. We're already in the GameObject.
}

// Update is called once per frame
function Update () {
	player.isMoving = false;

	// keyboard input
	if (Input.GetKey(KeyCode.LeftArrow)) {
		player.MoveLeft();
	}
	
	if (Input.GetKey(KeyCode.RightArrow)) {
		player.MoveRight();
	}
	
	if (Input.GetKey(KeyCode.Space)) {
		if (player.IsGrounded()) {
			player.Jump();
		}
	}
}
