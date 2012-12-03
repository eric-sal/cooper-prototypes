private var player : Player;
private var currentAnimation : animations;

public enum animations { StandRight, WalkRight, StandLeft, WalkLeft };

// Use this for initialization
function Start() {
	player = GetComponent(Player);
}

// Update is called once per frame
function Update() {
	// run right
	if (player.directionX == Player.TO_THE_RIGHT) {
		if (player.isMoving) {
			if (currentAnimation != animations.WalkRight) {
				currentAnimation = animations.WalkRight;
				player.Sprite().Play("runRight");
			}
		} else {
			if (currentAnimation != animations.StandRight) {
				currentAnimation = animations.StandRight;
				player.Sprite().ShowFrame(3);
			}
		}
	}
	
	// run left
	if (player.directionX == Player.TO_THE_LEFT) {
		if (player.isMoving) {
			if (currentAnimation != animations.WalkLeft) {
				currentAnimation = animations.WalkLeft;
				player.Sprite().Play("runLeft");
			}
		} else {
			if (currentAnimation != animations.StandLeft) {
				currentAnimation = animations.StandLeft;
				player.Sprite().ShowFrame(0);
			}
		}
	}
}
