#pragma strict

// Unity recommends writing mixins rather than subclassing. So rather than making CoinBlock
// extend the Block class, we create both a Block and CoinBlock class, and add them both as
// components on the GameObject.
// http://wiki.unity3d.com/index.php/Head_First_into_Unity_with_UnityScript#Consider_Writing_Mixins_and_Helpers_Instead_of_Subclassing

public enum LootType { Coin, PowerUp, Star, ExtraLife };

public var lootType : LootType;
public var lootContainer : CoinBlockLootContainer;

private var _block : Block;
private var _animatingSprite : OTAnimatingSprite;

// Use this for initialization
function Start() {
	_block = GetComponent(Block);
	_animatingSprite = GetComponent(OTAnimatingSprite);
}

function BottomHit() {
	if (!_block.disabled) {
		// stop the coin block from animating, and set the sprite to show the disabled block
		_animatingSprite.Stop();
		_animatingSprite.frameIndex = 19;
		_block.disabled = true;
		
		var loot : GameObject;
		switch (lootType) {
			case LootType.Coin:
				// For some reason, calling Instantiate with the method definition of:
				// Instantiate(original, position, rotation); doesn't actually set the position
				// of the sprite. Perhaps because it sets the position on the Transform object,
				// rather than on the OTSprite object of the instance.
				loot = Instantiate(lootContainer.coin);
				break;
			case LootType.PowerUp:
				break;
			case LootType.Star:
				break;
			case LootType.ExtraLife:
				break;
		}
		
		// Since the loot variable is instantiated as a GameObject, and not a specific class
		// (ie: CoinFromBlock), we use SendMessage() to call SetPosition on the instance. Any
		// object that has a script with a method named SetPosition will fire the method.
		loot.SendMessage('SetPosition', _block.GetStartingPosition());
		
	}
}
