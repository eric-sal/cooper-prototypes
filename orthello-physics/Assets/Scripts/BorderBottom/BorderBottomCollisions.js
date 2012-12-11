// Destroy everything that enters the collider
function OnTriggerEnter(other : Collider) {
	var player = other.GetComponent(Player);
	
	if (player) {
		player.Respawn();
	} else {
		Destroy(other.gameObject);
	}
}
