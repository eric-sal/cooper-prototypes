#pragma strict

private var _camera : OTView;
private var _sprite : OTAnimatingSprite;
public var player : Player;

function Start () {
	_camera = OT.view;
	_sprite = player.GetComponent(OTAnimatingSprite);
}

function Update () {
	_camera.position.x = _sprite.position.x;
}