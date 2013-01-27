#pragma strict

public var numberAvailable : int = 1;	// how many coins will this block spawn before it runs out?

private var _block : Block;
private var _numberSpawned : int = 0;

// Use this for initialization
function Start() {
	_block = GetComponent(Block);
}

function OnEventBottomHit() {
	if (!_block.disabled) {
		var coin : CoinFromBlock = Instantiate(Resources.Load('loot/CoinFromBlock', CoinFromBlock));
		coin.SetPosition(_block.StartingPosition());
		
		_numberSpawned += 1;
		if (_numberSpawned == numberAvailable) {
			SendMessage('Disable');
		}
	}
}
