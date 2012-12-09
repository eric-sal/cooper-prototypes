public enum Animations { StandRight, WalkRight, StandLeft, WalkLeft };

private var _player : Player;
private var _currentAnimation : Animations;

// Use this for initialization
function Start() {
	_player = this.GetComponent(Player);
}

// Update is called once per frame
function Update() {
	if (_player.IsFacingRight()) {
		if (_player.GetIsWalking()) {
			if (_currentAnimation != Animations.WalkRight) {
				_currentAnimation = Animations.WalkRight;
				_player.GetSprite().Play("runRight");
			}
		} else {
			if (_currentAnimation != Animations.StandRight) {
				_currentAnimation = Animations.StandRight;
				_player.GetSprite().ShowFrame(3);
			}
		}
	}
	else {
		// player is facing left
		if (_player.GetIsWalking()) {
			if (_currentAnimation != Animations.WalkLeft) {
				_currentAnimation = Animations.WalkLeft;
				_player.GetSprite().Play("runLeft");
			}
		} else {
			if (_currentAnimation != Animations.StandLeft) {
				_currentAnimation = Animations.StandLeft;
				_player.GetSprite().ShowFrame(0);
			}
		}
	}
}
