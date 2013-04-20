using UnityEngine;
using System.Collections;

public class MarioTwinCollisionHandler : CharacterCollisionHandler {
    private MarioTwinController _controller;
 
    public override void Awake() {
        _controller = GetComponent<MarioTwinController>();
        base.Awake();
    }
 
    public override void HandleCollision(AbstractCollisionHandler other, Vector3 fromDirection, float distance) {
        // standard behavior to prevent overlapping sprites
        base.HandleCollision(other.collider, fromDirection, distance);
     
        switch (other.GetType().ToString()) {
        case "PlayerCollisionHandler":
            HandleSpecialCollision((PlayerCollisionHandler)other, fromDirection, distance);
            break;
        }
    }
 
    public void HandleSpecialCollision(PlayerCollisionHandler player, Vector3 fromDirection, float distance) {
        Debug.Log(string.Format("Mario Twin collided with {0}.  They look so goddamn like the same person.", player.name));

        if (_controller.changeDirectionOnCollision) {
            _character.facing.x *= -1;
        }

        if (_controller.jumpOnCollision) {
            _controller.Jump();
        }
    }
}
