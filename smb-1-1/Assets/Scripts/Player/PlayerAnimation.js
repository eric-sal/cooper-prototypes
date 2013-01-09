#pragma strict

public enum Animations { StandRight, SlideRight, WalkRight, JumpRight, StandLeft, SlideLeft, WalkLeft, JumpLeft };

private var _player : Player;
private var _currentAnimation : Animations;

// Use this for initialization
function Start() {
	_player = this.GetComponent(Player);
}

// Update is called once per frame
function FixedUpdate() {
	if (_player.IsFacingRight()) {
		if (_player.GetIsWalking()) {
			if (_currentAnimation != Animations.WalkRight) {
				_currentAnimation = Animations.WalkRight;
				_player.GetSprite().Play("WalkRight");
			}
		} else if (_player.IsJumping()) {
			if (_currentAnimation != Animations.JumpRight) {
				_currentAnimation = Animations.JumpRight;
				_player.GetSprite().ShowFrame(2);
			}
		} else {
			if (_currentAnimation != Animations.StandRight) {
				_currentAnimation = Animations.StandRight;
				_player.GetSprite().ShowFrame(6);
			}
		}
	}
	else {
		// player is facing left
		if (_player.GetIsWalking()) {
			if (_currentAnimation != Animations.WalkLeft) {
				_currentAnimation = Animations.WalkLeft;
				_player.GetSprite().Play("WalkLeft");
			}
		} else if (_player.IsJumping()) {
			if (_currentAnimation != Animations.JumpLeft) {
				_currentAnimation = Animations.JumpLeft;
				_player.GetSprite().ShowFrame(1);
			}
		} else {
			if (_currentAnimation != Animations.StandLeft) {
				_currentAnimation = Animations.StandLeft;
				_player.GetSprite().ShowFrame(5);
			}
		}
	}
}
