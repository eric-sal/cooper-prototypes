#pragma strict

// This container points to prefabs of each loot type. The cointainer will be added as an attribute
// on to the CoinBlock prefab, which will allow us to create instances of these loot types when
// the coin block is hit.
public var coin : GameObject;
public var mushroom : GameObject;
public var flower : GameObject;
public var star : GameObject;
public var extraLife : GameObject;
