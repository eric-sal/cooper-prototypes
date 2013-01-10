#pragma strict

public enum Types { CoinBlock, FloatingBrick };
public var type : Types;

private var _sprite : OTSprite;

function Start () {
	_sprite = GetComponent(OTSprite);
	_sprite.InitCallBacks(this);
}

function OnCollision(owner : OTObject) {
	Debug.Log(owner);
	Debug.Log(owner.collision);
	Debug.Log(owner.hitPoint);

}
