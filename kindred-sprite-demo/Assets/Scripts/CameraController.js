#pragma strict

public var player : Player;
private var _sprite : Sprite;
private var _camera : Transform;

function Start () {
	_camera = GameObject.FindWithTag("MainCamera").transform;
	_sprite = player.GetComponent(Sprite);
}

function Update () {
	_camera.position.x = _sprite.position.x;
}
