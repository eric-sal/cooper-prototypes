using UnityEngine;
using System.Collections;

public class PlayerCollisionHandler : CharacterCollisionHandler {

    private PlayerCharacterController _controller;
 
    public override void Awake() {
        _controller = GetComponent<PlayerCharacterController>();
        base.Awake();
    }
	
	public override void HandleCollision(AbstractCollisionHandler other, Vector3 fromDirection, float distance) {
        string otherType = other.GetType().ToString();

        switch (otherType) {
        case "MarioTwinCollisionHandler":
            base.HandleCollision(other.collider, fromDirection, distance);
            HandleSpecialCollision((MarioTwinCollisionHandler)other, fromDirection, distance);
            break;

        case "PickupCollisionHandler":
            _character.coinCount++;
            break;

        default:
            // standard behavior to prevent overlapping sprites
            base.HandleCollision(other.collider, fromDirection, distance);
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
