using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;

public class TimerGUI : MonoBehaviour {
    private GameTimer _gameTimer;
    private GUIStyle _centeredWhiteText = new GUIStyle();
    private Dictionary<string, int> _boxSize = new Dictionary<string, int>() { {"width", 100}, {"height", 40} };
    private Dictionary<string, int> _boxPosition = new Dictionary<string, int>();
    private Rect _displayBox;
    private Rect _pausedBox;

    public void Awake() {
        _gameTimer = (GameTimer)GetComponent("GameTimer");

        _centeredWhiteText.alignment = TextAnchor.MiddleCenter;
        _centeredWhiteText.normal.textColor = Color.white;

        _boxPosition.Add("left", (Screen.width - _boxSize["width"]) / 2);
        _boxPosition.Add("top", (Screen.height - _boxSize["height"]) / 2 - 100);

        _displayBox = new Rect(_boxPosition["left"], _boxPosition["top"], _boxSize["width"], _boxSize["height"]);
        _pausedBox = new Rect(_boxPosition["left"], _boxPosition["top"] + 20, 100, 10);
    }

    public void OnGUI() {
        GUI.Box(_displayBox, _gameTimer.ToString());

        if (_gameTimer.paused) {
            GUI.Label(_pausedBox, "Paused", _centeredWhiteText);
        }
    }
}
