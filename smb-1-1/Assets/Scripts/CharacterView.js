#pragma strict

public var animationStanding : OTAnimation = null;
public var animationWalking : OTAnimation = null;
public var animationJumping: OTAnimation = null;

private var _sprite : OTAnimatingSprite;
private var _character : Character;
private var _wasFacingRight : boolean;
private var _jitterThreshhold : float = 0.1;

function Start() {
	_sprite = this.GetComponent(OTAnimatingSprite);
	_character = this.GetComponent(Character);
	_wasFacingRight = _character.IsFacingRight();
}

// at a fixed interval, check what the character is doing and update their animation to refect that
function FixedUpdate() {
	
	// don't just do "_sprite.flipHorizontal = _character.IsFacingLeft();" or it messes up the animation
	if (_wasFacingRight && _character.IsFacingLeft()) {
		_sprite.flipHorizontal = true;
		_wasFacingRight = false;
	} else if (!_wasFacingRight && _character.IsFacingRight()) {
		_sprite.flipHorizontal = false;
		_wasFacingRight = true;
	}
	
	// our collision detection introduces a jitter for
	// _character.isGrounded apparently so don't use that to determine the animation to play	
	if (_character.IsJumping() || (Mathf.Abs(_character.GetVelocity().y) > 1)) {
		this.SetAnimation(this.animationJumping);
	}
	else if (_character.IsWalking()) {
		this.SetAnimation(this.animationWalking);
	}
	else {
		this.SetAnimation(this.animationStanding);
	}	
}

// change the current aniamtion and play it if it's different
function SetAnimation(animation : OTAnimation) {

	if (_sprite.animation != animation) {
	
		_sprite.animation = animation;
		
		if (animation != null) {
			_sprite.Play();
		}
	}	
}