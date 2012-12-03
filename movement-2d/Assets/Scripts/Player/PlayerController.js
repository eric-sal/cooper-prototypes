private var player : Player;

// Use this for initialization
function Start () {
	player = GetComponent(Player);
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
		if (player.isGrounded) {
			player.Jump();
		}
	}
	
	ApplyGravity();
	
	UpdateRaycasts();
}

// I'd like to see methods like ApplyGravity and UpdateRaycasts in the SceneController.
// It would grab all instances of applicable objects (player, enemies, moveable objects, etc.),
// loop through the array of objects, and call the related instance methods.
function ApplyGravity() {
	player.ApplyGravity();
}

function UpdateRaycasts() {
	player.UpdateRaycasts();
}
