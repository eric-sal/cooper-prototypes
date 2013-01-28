#pragma strict

// NOTES TO SELF:
// 	1. Enemies should not be instantiated until the player gets near the enemy's starting position.
//	   Starting positions can probably be stored in a Hashtable in SceneController.js, and that script
//	   can probably handle spawning the enemies when necessary.
//	2. Create Enemy.js and EnemyController.js scripts for generic enemy behavior.
public var pointValue : int = 100;

function Start() {
}

function GetPointValue() : int {
	return pointValue;
}

function OnEnterBottomBounds() {
	Destroy(gameObject);
}
