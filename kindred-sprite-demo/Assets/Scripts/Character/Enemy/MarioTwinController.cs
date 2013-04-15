using UnityEngine;
using System.Collections;

public class MarioTwinController : AbstractCharacterController {

    public bool changeDirectionOnCollision;
    public bool jumpOnCollision;

	protected override void Act() {
        _character.velocity.x = _character.maxWalkSpeed * _character.facing.x;
        if (_character.velocity.y < 0) {
            // we are falling or about to fall!
            Jump();
        }
    }

    protected override void OnCollision(GameObject collidedWith) {
        if (collidedWith.name == "Ground") {
            return;
        }

        if (changeDirectionOnCollision) {
            _character.facing.x *= -1;
        }

        if (jumpOnCollision) {
            Jump();
        }

        base.OnCollision(collidedWith);
    }
}
