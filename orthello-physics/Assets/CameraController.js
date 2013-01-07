#pragma strict

private var _player : Player;
private var _camera : OTView;

function Start () {
	_camera = OT.view;
	_player = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
}

function Update () {
	var playerSprite : OTAnimatingSprite = _player.GetSprite();		
	_camera.position.x = playerSprite.position.x;
}