public static var GRAVITY : float = 20.0;
public static var GROUND_MASK : int = 1 << 8; // layer = Ground

var player : Player;

// Use this for initialization
function Start() {
	// We can either assign the value of the player variable via the Unity Editor (as we have here) by dragging
	// and dropping our player instance from the hierarchy onto the Player attribute in the Scene Controller
	// component in the inspector, or we find the GameObject instance we created in the Unity scene named
	// 'player', and from that, grab the Player script which has all of our player-related methods. Ex:
	// player = GameObject.Find('player').GetComponent(Player);
}

// Update is called once per frame
function Update() {
	UpdateRaycasts();
}

// put physics updates in FixedUpdate()
function FixedUpdate() {
	ApplyGravity();
}

// I'd like to house methods like ApplyGravity and UpdateRaycasts in the SceneController.
// It would grab all instances of applicable objects (player, enemies, moveable objects, etc.),
// loop through the array of objects, and call the related instance methods.
function ApplyGravity() {
	player.ApplyGravity();
}

function UpdateRaycasts() {
	player.UpdateRaycasts();
}

public static function CalculateJumpVerticalSpeed(targetJumpHeight : float) : float {
	// From the jump height and gravity we deduce the upwards speed for the character to reach at the apex.
	return Mathf.Sqrt(2 * targetJumpHeight * GRAVITY);
}