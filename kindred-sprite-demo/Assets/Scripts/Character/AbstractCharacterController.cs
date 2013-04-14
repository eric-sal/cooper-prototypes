using UnityEngine;
using System.Collections;

/// <summary>
/// Updates character position based on velocity and handles collisions.
/// Associated GameObject should have a Character-derived script and a
/// kindred-sprite Sprite-derived script.
///
/// You cannot assign this to a game object directly.  You must inherit
/// from this class.
///
/// Sub-classes should modify character state in the 'Act' function.
/// </summary>
public abstract class AbstractCharacterController : MonoBehaviour {

    protected CharacterState _character;
    protected Sprite _sprite;
    protected Transform _transform;
    protected float _colliderBoundsOffsetX;
    protected float _colliderBoundsOffsetY;
    protected float _skinThickness;
    protected float _jumpTolerance;

    public virtual void Awake() {
        _character = GetComponent<CharacterState>();
        _sprite = GetComponent<Sprite>();
        _transform = this.transform;
    }

    public virtual void Start() {
        /*
         * should these be the other way around with the character position
         * driving the transform position?
         */
        _character.position.x = _transform.position.x;
        _character.position.y = _transform.position.y;

        _colliderBoundsOffsetX = this.collider.bounds.extents.x;
        _colliderBoundsOffsetY = this.collider.bounds.extents.y;
        _skinThickness = 0.01f;
        _jumpTolerance = 30.0f;
    }

    /// <summary>
    /// This is to be defined by subclasses.  This method is called from
    /// FixedUpdate before any physics calculations have been performed.
    /// Here would be where player inputs would get recorded and the
    /// character state would get modified.  For enemies, the AI would
    /// alter the state instead.
    /// </summary>
    protected abstract void Act();

    public virtual void FixedUpdate() {
        // Let player or AI modify character state first
        Act();

        // Will do nothing if the character is grounded
        ApplyGravity();

        // adjust velocity and fire events based on collisions (if any)
        float dt = Time.deltaTime;
        CollisionCheck(dt);

        // move the character
        float x = _transform.position.x + _character.velocity.x * dt;
        float y = _transform.position.y + _character.velocity.y * dt;
        _transform.position = new Vector3(x, y, 0);
        _character.position = new Vector2(x, y);

        if (_character.isGrounded) {
            _character.isWalking = _character.velocity.x != 0;
        }
    }

    /// <summary>
    /// Based on the _character's velocity, checks to see if the character would collide
    /// with something.  If so, then the character's velcoity and position are updated to
    /// prevent overlapping sprites.
    ///
    /// TODO: Fire collision events for _character and whatever _character collided with.
    /// </summary>
    /// <param name='deltaTime'>
    /// The amount of time that has passed since the last collision check.
    /// </param>
    public virtual void CollisionCheck(float deltaTime) {

        Vector3 rayOrigin = this.collider.bounds.center;
        float absoluteDistance;
        RaycastHit hitInfo;

        // cast horizontal rays
        float hVelocity = _character.velocity.x;

        // if we're not moving horizontally, then don't cast any horizontal rays
        if (hVelocity != 0) {
            Vector3 hDirection = (hVelocity > 0) ? Vector3.right : -Vector3.right;

            float hDistance = hVelocity * deltaTime;
            absoluteDistance = Mathf.Abs(hDistance) + _colliderBoundsOffsetX + _skinThickness;

            Vector3 yOffset = new Vector3(0, _colliderBoundsOffsetY - _skinThickness, 0);

            if (Physics.Raycast(rayOrigin, hDirection, out hitInfo, absoluteDistance) ||
                Physics.Raycast(rayOrigin + yOffset, hDirection, out hitInfo, absoluteDistance) ||
                Physics.Raycast(rayOrigin - yOffset, hDirection, out hitInfo, absoluteDistance)) {

                // a horizontal collision has occurred
                _character.velocity.x = 0;
                hDistance = hitInfo.distance - _colliderBoundsOffsetX;

                if (hDirection == Vector3.right) {
                    _transform.position = new Vector3(_transform.position.x + hDistance, _transform.position.y, 0);
                } else {
                    _transform.position = new Vector3(_transform.position.x - hDistance, _transform.position.y, 0);
                }

                // TODO: Fire collision events
                //SendMessage('OnEventCollision', { 'collider': hitInfo.collider, 'normal': hitInfo.normal }, SendMessageOptions.DontRequireReceiver);    // Let this GameObject know we hit something
                //hitInfo.collider.SendMessage("OnEventCollision", { 'collider': collider, 'normal': hitInfo.normal }, SendMessageOptions.DontRequireReceiver);   // let the object we hit know that it got hit
            } else {
                // we didn't have a horizontal collision, offset the vertical rays by the amount the player moved
                rayOrigin.x += hDistance;
            }
        }

        // cast veritcal rays
        float vVelocity = _character.velocity.y;

        // even if we're not currently moving in the y direction, cast a ray in the direction of gravity (i.e. down)
        Vector3 vDirection = (vVelocity > 0) ? Vector3.up : -Vector3.up;

        float vDistance = vVelocity * deltaTime;
        absoluteDistance = Mathf.Abs(vDistance) + _colliderBoundsOffsetY + _skinThickness;

        Vector3 xOffset = new Vector3(_colliderBoundsOffsetX - _skinThickness, 0, 0);

        if (Physics.Raycast(rayOrigin, vDirection, out hitInfo, absoluteDistance) ||
            Physics.Raycast(rayOrigin + xOffset, vDirection, out hitInfo, absoluteDistance) ||
            Physics.Raycast(rayOrigin - xOffset, vDirection, out hitInfo, absoluteDistance)) {

            // a vertical collision has occurred
            _character.velocity.y = 0;
            vDistance = hitInfo.distance - _colliderBoundsOffsetY;

            if (vDirection == Vector3.up) {
                // bumped our head
                _transform.position = new Vector3(_transform.position.x, _transform.position.y + vDistance, 0);
            } else {
                // hit the gound
                _character.isGrounded = true;
                _character.isJumping = false;
                _transform.position = new Vector3(_transform.position.x, _transform.position.y - vDistance, 0);
            }

            // TODO: Fire collision events
            //SendMessage('OnEventCollision', { 'collider': hitInfo.collider, 'normal': hitInfo.normal }, SendMessageOptions.DontRequireReceiver);    // Let this GameObject know we hit something
            //hitInfo.collider.SendMessage("OnEventCollision", { 'collider': collider, 'normal': hitInfo.normal }, SendMessageOptions.DontRequireReceiver);   // let the object we hit know that it got hit
        } else {
            _character.isGrounded = false;
        }
    }

    // TODO: Convert to event handler
    protected virtual void Jump(float multiplier = 1.0f) {
        if (Mathf.Abs(_character.velocity.y) <= _jumpTolerance) {
            _character.isGrounded = _character.isWalking = false;
            _character.isJumping = true;
            _character.velocity.y += _character.jumpSpeed * multiplier;
        }
    }

    public virtual void ApplyGravity() {
        if (!_character.isGrounded) {
            AddVelocity(new Vector2(0, SceneController.GRAVITY * Time.deltaTime));
        }
    }

    protected void AddVelocity(Vector2 v) {
        _character.velocity.x += v.x;
        _character.velocity.y += v.y;
    }
}
