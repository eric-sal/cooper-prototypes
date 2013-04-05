#pragma strict

public var player : Player;
private var _sprite : Sprite;
private var _camera : Transform;
private var _bgCamera1 : Transform;
private var _bgCamera2 : Transform;
private var _bgCamera3 : Transform;

function Start () {
	_camera = GameObject.FindWithTag("MainCamera").transform;
    _bgCamera1 = GameObject.FindWithTag("BGCamera1").transform;
    _bgCamera2 = GameObject.FindWithTag("BGCamera2").transform;
    _bgCamera3 = GameObject.FindWithTag("BGCamera3").transform;
	_sprite = player.GetComponent(Sprite);
}

function Update () {
	_camera.position.x = _sprite.position.x;
    _bgCamera1.position.x  = _sprite.position.x * 0.65;
    _bgCamera2.position.x  = _sprite.position.x * 0.9;
    _bgCamera3.position.x  = _sprite.position.x * 0.85;
}
