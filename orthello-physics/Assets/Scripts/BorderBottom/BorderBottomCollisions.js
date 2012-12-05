// Destroy everything that enters the collider
function OnTriggerEnter(other : Collider) {
	Destroy(other.gameObject);
}
