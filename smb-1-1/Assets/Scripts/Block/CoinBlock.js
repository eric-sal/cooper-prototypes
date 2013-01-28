#pragma strict

public var numberAvailable : int = 1;	// how many coins will this block spawn before it runs out?

private var _block : Block;
private var _numberSpawned : int = 0;

// Use this for initialization
function Start() {
	_block = GetComponent(Block);
}

// Called when something else runs into this object
function OnEventHit(args : Hashtable) {
	var normal : Vector3 = args['normal'];

	if (normal == -Vector3.up) {	// the bottom of this object got hit
		if (!_block.disabled) {
			var coin : CoinFromBlock = Instantiate(Resources.Load('loot/CoinFromBlock', CoinFromBlock));
			coin.SetPosition(_block.StartingPosition());
			
			_numberSpawned += 1;
			if (_numberSpawned == numberAvailable) {
				SendMessage('Disable');
			}
		}
	}
}
