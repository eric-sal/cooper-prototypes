#pragma strict

public var player : Player;
private var _sprite : Sprite;
private var _camera : Transform;
private var _bgCamera : Transform;

function Start () {
	_camera = GameObject.FindWithTag("MainCamera").transform;
    _bgCamera = GameObject.FindWithTag("BGCamera").transform;
	_sprite = player.GetComponent(Sprite);
}

function Update () {
	_camera.position.x = _sprite.position.x;
    _bgCamera.position.x  = _sprite.position.x * 0.5;

}
