using UnityEngine;
using System.Collections;

public class CoinGUI : MonoBehaviour {
	private GUIText _marioCoins;
	private CharacterState _mario;
	private GUIText _twinCoins;
	private CharacterState _twin;

    public void Awake() {
		_marioCoins = (GUIText)GameObject.Find("GUIText/MarioCoins/CoinValue").GetComponent("GUIText");
		_mario = (CharacterState)GameObject.Find("MarioSprite").GetComponent("CharacterState");
		_twinCoins = (GUIText)GameObject.Find("GUIText/MarioTwinCoins/CoinValue").GetComponent("GUIText");
		_twin = (CharacterState)GameObject.Find("MarioTwinSprite").GetComponent("CharacterState");
    }

    public void Update() {
        _marioCoins.text = _mario.coinCount.ToString("D2");
		_twinCoins.text = _twin.coinCount.ToString("D2");
    }
}
