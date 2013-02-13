#pragma strict

function OnEventCollision(args : Hashtable) {
	var otherCollider : Collider = args['collider'];

	var flag : GameObject = GameObject.Find('Flag');
	iTween.MoveTo(flag, { 'y': -80, 'easetype': 'linear', 'speed': 150 });
	
	// disable the collider once we hit it, so we can move past it
	collider.enabled = false;

	// Do what we do when the level is completed
	otherCollider.SendMessage('LevelComplete');
}
