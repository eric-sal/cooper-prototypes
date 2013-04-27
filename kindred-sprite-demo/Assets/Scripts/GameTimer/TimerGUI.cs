using UnityEngine;
using System;
using System.Collections;

public class TimerGUI : MonoBehaviour {
	private GUIText _timeValue;
	private GameTimer _gameTimer;

    public void Awake() {
		_timeValue = (GUIText)GameObject.Find("GUIText/TimeValue").GetComponent("GUIText");
		_gameTimer = (GameTimer)GetComponent("GameTimer");
    }

    public void Update() {
        _timeValue.text = Math.Floor(_gameTimer.currentTime).ToString();
    }
}
