#pragma strict

private var _sprite : OTAnimatingSprite;

// Use Awake(), rather than Start(), as Awake() is called immediately when the object is instantiated.
function Awake() {
	_sprite = GetComponent(OTAnimatingSprite);
	
	// Orthello doesn't retain the spriteContainer or animation properties when a GameObject is
	// made into a prefab, so we have to manually set these two properties.
	_sprite.spriteContainer = GameObject.Find('OT/Containers/Blocks').GetComponent(OTContainer);
	_sprite.animation = GameObject.Find('OT/Animations/CoinFromBlock').GetComponent(OTAnimation);
}

function Start() {
	// we found a coin, so increment our coin count
	GameObject.Find('Mario').GetComponent(Player).coins += 1;	// Why doesn't this work?!?!?!
}

// These objects should only be instantiated after a CoinBlock has been hit.
// We want to animate the movement of the coin coming out of the top of the block.
// Setting destroyWhenFinished to true on the CoinFromBlock prefab, will destroy
// this instance when the animation finishes playing.
function Update() {
	_sprite.position.y += 3.5;
}

function SetPosition(position : Vector2) {
	_sprite.position = position;
}
