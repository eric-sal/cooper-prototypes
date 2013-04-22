using UnityEngine;
using System.Collections;

public class CharacterCollisionHandler : AbstractCollisionHandler {
    protected CharacterState _character;
    protected Transform _transform;

    public virtual void Awake() {
        _character = GetComponent<CharacterState>();
        _transform = this.transform;
    }

    /// <summary>
    /// Characters treat unhandled special collisions like normal collisions to prevent overlapping sprites.
    /// </summary>
    public override void HandleCollision(AbstractCollisionHandler other, Vector3 fromDirection, float distance) {
        HandleCollision(other.collider, fromDirection, distance);
    }
 
    /// <summary>
    /// When a character runs into a collider without a handler, we'll stop the character's movement in that direction.
    /// </summary>
    public override void HandleCollision(Collider collidedWith, Vector3 fromDirection, float distance) {
        // a collision in the direction we are moving means we should stop moving
        if (_character.isMovingRight && fromDirection == Vector3.right ||
            _character.isMovingLeft && fromDirection == Vector3.left) {

            _character.velocity.x = 0;
            float hDistance = distance - this.collider.bounds.extents.x;

            if (fromDirection == Vector3.left) {
				hDistance *= -1;
            }
			
			_transform.position = new Vector3(_transform.position.x + hDistance, _transform.position.y, 0);

        } else if (_character.isMovingUp && fromDirection == Vector3.up ||
            _character.isMovingDown && fromDirection == Vector3.down) {

            _character.velocity.y = 0;
            float vDistance = distance - this.collider.bounds.extents.y;

            if (fromDirection == Vector3.down) {
				_character.isGrounded = true;
                _character.isJumping = false;
				vDistance *= -1;
            }
			
			_transform.position = new Vector3(_transform.position.x, _transform.position.y + vDistance, 0);
        }
    }
}
