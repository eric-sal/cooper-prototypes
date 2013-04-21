using UnityEngine;
using System.Collections;

public class CharacterCollisionHandler : AbstractCollisionHandler {
    protected CharacterState _character;
    protected Transform _transform;
    protected float _colliderBoundsOffsetX;
    protected float _colliderBoundsOffsetY;

    public virtual void Awake() {
        _character = GetComponent<CharacterState>();
        _transform = this.transform;
    }

    public virtual void Start() {
        _character.position.x = _transform.position.x;
        _character.position.y = _transform.position.y;

        _colliderBoundsOffsetX = this.collider.bounds.extents.x;
        _colliderBoundsOffsetY = this.collider.bounds.extents.y;
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
            float hDistance = distance - _colliderBoundsOffsetX;

            if (fromDirection == Vector3.right) {
                _transform.position = new Vector3(_transform.position.x + hDistance, _transform.position.y, 0);
            } else {
                _transform.position = new Vector3(_transform.position.x - hDistance, _transform.position.y, 0);
            }

        } else if (_character.isMovingUp && fromDirection == Vector3.up ||
            _character.isMovingDown && fromDirection == Vector3.down) {

            _character.velocity.y = 0;
            float vDistance = distance - _colliderBoundsOffsetY;

            if (fromDirection == Vector3.up) {
                // bumped our head
                _transform.position = new Vector3(_transform.position.x, _transform.position.y + vDistance, 0);
            } else {
                // hit the gound
                _character.isGrounded = true;
                _character.isJumping = false;
                _transform.position = new Vector3(_transform.position.x, _transform.position.y - vDistance, 0);
            }
        }
    }
}
