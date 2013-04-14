using UnityEngine;
using System.Collections;

/// <summary>
/// The Character state is modified by a class that inherits from AbstractCharacterController.
/// </summary>
public class CharacterState : MonoBehaviour {

    public Vector2 position;
    public Vector2 facing;
    public Vector2 velocity;
    public int maxWalkSpeed;
    public int jumpSpeed;
    public int health;
    public bool isGrounded;
    public bool isWalking;
    public bool isJumping;
}
