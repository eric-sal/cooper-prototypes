#pragma strict

function OnTriggerEnter(other : Collider) {
	// No matter what hit the bottom bounds, if it has a script that includes a function
	// named 'OnEnterBottomBounds', it will be executed.
	other.SendMessage('OnEnterBottomBounds');
}
