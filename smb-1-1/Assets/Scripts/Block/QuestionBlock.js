#pragma strict

// Unity recommends writing mixins rather than subclassing. So rather than making CoinBlock
// extend the Block class, we create both a Block and CoinBlock class, and add them both as
// components on the GameObject.
// http://wiki.unity3d.com/index.php/Head_First_into_Unity_with_UnityScript#Consider_Writing_Mixins_and_Helpers_Instead_of_Subclassing

private var _animatingSprite : OTAnimatingSprite;

// Use this for initialization
function Start() {
	_animatingSprite = GetComponent(OTAnimatingSprite);
}

function Disable() {
	_animatingSprite.Stop();
}
