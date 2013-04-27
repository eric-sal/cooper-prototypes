using UnityEngine;
using System.Collections;

public class MarioTwinCollisionHandler : CharacterCollisionHandler {
    private MarioTwinController _controller;
 
    public override void Awake() {
        _controller = GetComponent<MarioTwinController>();
        base.Awake();
    }
	
	public override void HandleCollision(Collider collidedWith, Vector3 fromDirection, float distance) {
		base.HandleCollision(collidedWith, fromDirection, distance);
		
		if (fromDirection == Vector3.right) {
			// If the twin's forward progress is stopped (i.e.: by a pipe or block), jump over it
			_controller.Jump();
		}
	}
 
    public override void HandleCollision(AbstractCollisionHandler other, Vector3 fromDirection, float distance) {
        string otherType = other.GetType().ToString();

        switch (otherType) {
        case "PlayerCollisionHandler":
            base.HandleCollision(other.collider, fromDirection, distance);
            HandleSpecialCollision((PlayerCollisionHandler)other, fromDirection, distance);
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
 
    public void HandleSpecialCollision(PlayerCollisionHandler player, Vector3 fromDirection, float distance) {
		if (fromDirection == Vector3.down || fromDirection == Vector3.left || fromDirection == Vector3.right) {
			// If the player hits his twin from the bottom, left, right, then jump
            _controller.Jump();
		}
    }
}
