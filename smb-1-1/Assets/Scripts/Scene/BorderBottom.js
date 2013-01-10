#pragma strict

function OnTriggerEnter(other : Collider) {
	other.gameObject.GetComponent(Player).Respawn();
}
