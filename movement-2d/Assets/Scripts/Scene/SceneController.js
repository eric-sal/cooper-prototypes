public static var GRAVITY = 20.0;

// layer masks	
public static var GROUND_MASK : int = 1 << 8; // layer = Ground


// Use this for initialization
function Start () {
}

// Update is called once per frame
function Update () {
}

public static function CalculateJumpVerticalSpeed(targetJumpHeight : float) : float {
	// From the jump height and gravity we deduce the upwards speed for the character to reach at the apex.
	return Mathf.Sqrt(2 * targetJumpHeight * GRAVITY);
}
