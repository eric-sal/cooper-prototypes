using UnityEngine;
using System.Collections;

public class SceneController : MonoBehaviour {
    private GameTimer _gameTimer;

    public void Awake() {
        _gameTimer = (GameTimer)GetComponent("GameTimer");
    }

    public void Update() {
        if (Input.GetButtonDown("Pause")) {
            if (_gameTimer.paused) {
                _gameTimer.Unpause();
            } else {
                _gameTimer.Pause();
            }
        }
    }
}

