#pragma strict

public enum Animations { StandRight, SlideRight, WalkRight, JumpRight, StandLeft, SlideLeft, WalkLeft, JumpLeft, PlayerDeath };

private var _character : Character;
private var _player : Player;
private var _sprite : OTAnimatingSprite;
private var _currentAnimation : Animations;

// Use this for initialization
function Start() {
	_character = GetComponent(Character);
	_player = GetComponent(Player);
	_sprite = GetComponent(OTAnimatingSprite);
}

// Update is called once per frame
function FixedUpdate() {
	if (_character.IsDead()) {
		if (_currentAnimation != Animations.PlayerDeath) {
			_currentAnimation = Animations.PlayerDeath;
			_sprite.ShowFrame(0);

			var currentPosition : Vector3 = _sprite.position;
			var apex : Vector3 = currentPosition + (Vector3.up * 112);
			
			// Calling Player.Respawn() oncomplete probably isn't the best bet in the long run.
			// We not only want to respawn the player, but reset the level.
			// Plan: Add a method to SceneController called Reset, and add a Reset method to
			// every object that can/needs to be reset after player death.
			iTween.MoveTo(gameObject, {'path': [apex, currentPosition], 'easetype': 'linear', 'time': 1, 'oncomplete': 'Respawn' });
		}
	} else {
		if (_character.IsFacingRight()) {
			if (_character.GetIsWalking()) {
				if (_currentAnimation != Animations.WalkRight) {
					_currentAnimation = Animations.WalkRight;
					_sprite.Play("WalkRight");
				}
			} else if (_character.IsJumping()) {
				if (_currentAnimation != Animations.JumpRight) {
					_currentAnimation = Animations.JumpRight;
					_sprite.ShowFrame(2);
				}
			} else {
				if (_currentAnimation != Animations.StandRight) {
					_currentAnimation = Animations.StandRight;
					_sprite.ShowFrame(7);
				}
			}
		} else {
			// player is facing left
			if (_character.GetIsWalking()) {
				if (_currentAnimation != Animations.WalkLeft) {
					_currentAnimation = Animations.WalkLeft;
					_sprite.Play("WalkLeft");
				}
			} else if (_character.IsJumping()) {
				if (_currentAnimation != Animations.JumpLeft) {
					_currentAnimation = Animations.JumpLeft;
					_sprite.ShowFrame(1);
				}
			} else {
				if (_currentAnimation != Animations.StandLeft) {
					_currentAnimation = Animations.StandLeft;
					_sprite.ShowFrame(6);
				}
			}
		}
	}
}
