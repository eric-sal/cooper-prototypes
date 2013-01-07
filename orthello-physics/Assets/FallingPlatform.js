#pragma strict

private var _player : Player;

function Start () {	
	_player = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
}

function Update () {
	// just goofing off
	var origin : Vector3 = this.collider.rigidbody.position;
	origin.y += this.collider.bounds.extents.y;
	if (Physics.Raycast(origin, Vector3.up, 1)) {
		this.collider.rigidbody.position.y -= 0.05;
	}
}