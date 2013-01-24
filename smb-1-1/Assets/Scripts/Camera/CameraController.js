#pragma strict

private var _camera : OTView;
public var player : Player;

function Start () {
	_camera = OT.view;
}

function Update () {
	var playerSprite : OTAnimatingSprite = player.GetSprite();		
	_camera.position.x = playerSprite.position.x;
}
