using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// This class uses the visitor pattern to dispatch calls to the correct overload of HandleSpecialCollision.
/// The 'OnCollision' method is like an 'Accept' method.
/// The 'HandleSpecialCollision' method is like a 'Visit' method.
/// </summary>
public abstract class AbstractCollisionHandler : MonoBehaviour {

    /// <summary>
    /// Gets called when the GameObject we collided with has no collision handler component associated with it
    /// </summary>
    public void OnCollision(Collider collidedWith, Vector3 fromDirection, float distance) {
        this.HandleNormalCollision(collidedWith, fromDirection, distance);
    }

    /// <summary>
    /// Handles collision with colliders that don't have collision handlers; like the ground or other
    /// non-interactive things in the environment.
    /// </summary>
    public abstract void HandleNormalCollision(Collider collidedWith, Vector3 fromDirection, float distance);


    /// <summary>
    /// A controller should call each collision handler's OnCollision method.  They in turn will call each other's HandleSpecialCollision methods.
    /// </summary>
    /// <param name='other'>
    /// The collision handler for the other thing we collided with.
    /// </param>
    /// <param name='fromDirection'>
    /// Relative to our origin, this is the direction the collision came from.
    ///
    /// So, for Mario jumping on a Goomba's head, the direction is down (-Vector3.up).  For the Goomba getting jumped
    /// on by Mario, the direction is up (Vector3.up).
    ///
    /// If Mario is running to the right and runs into a wall.  The direction is right (Vector3.right).  If the wall
    /// had a handler, the direction would be left (-Vector3.right) for it.
    ///
    /// The direction of movement is not always the direction of collision.  If Mario is running to the right, a Goomba
    /// might fall on his head.  To Mario, the fromDirection is up and to the Goomba it would be down.
    /// </param>
    /// <param name='distance'>
    /// The distance currently separating the two characters.  Remember, a collision is imminent and cannot be avoided.
    /// </param>
    public void OnCollision(AbstractCollisionHandler other, Vector3 fromDirection, float distance) {
        // Let the other handler do its thing.  We expect our own HandleSpecialCollision to be called by the other.OnCollision call.
        other.HandleSpecialCollision(this, fromDirection * -1, distance);
    }

    /// <summary>
    /// The default collision handler when special overloads have not been defined.  Typically, it would just
    /// prevent sprites from overlapping by calling HandleNormalCollision on the collider's of the handlers'
    /// GameObjects.
    /// </summary>
    /// <param name='other'>
    /// The handler connected to the other GameObject that collided with the GameObject this handler is connected to.
    /// </param>
    /// <param name='fromDirection'>
    /// The direction the other GameObject is coming from.
    /// </param>
    /// <param name='distance'>
    /// The distance currently separating the two GameObjects.  Remember, a collision is imminent and cannot be avoided.
    /// </param>
    public abstract void HandleSpecialCollision(AbstractCollisionHandler other, Vector3 fromDirection, float distance);
}
