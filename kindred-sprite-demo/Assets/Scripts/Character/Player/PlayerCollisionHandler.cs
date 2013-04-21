using UnityEngine;
using System.Collections;

public class PlayerCollisionHandler : CharacterCollisionHandler {
	private PlayerCharacterController _controller;
 
    public override void Awake() {
        _controller = GetComponent<PlayerCharacterController>();
        base.Awake();
    }
	
	public override void HandleCollision(AbstractCollisionHandler other, Vector3 fromDirection, float distance) {
        // standard behavior to prevent overlapping sprites
        base.HandleCollision(other.collider, fromDirection, distance);
     
        switch (other.GetType().ToString()) {
        case "MarioTwinCollisionHandler":
            HandleSpecialCollision((MarioTwinCollisionHandler)other, fromDirection, distance);
            break;
        }
    }
	
    public void HandleSpecialCollision(MarioTwinCollisionHandler player, Vector3 fromDirection, float distance) {
		if (fromDirection == Vector3.down) {
			// If the player jumps on the head of the twin, make him bounce off
            _controller.Jump();
		}
    }
}
