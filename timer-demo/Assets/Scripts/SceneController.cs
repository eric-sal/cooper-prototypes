using UnityEngine;
using System.Collections;

public class SceneController : MonoBehaviour {
    private CountdownTimer _gameTimer;

    public void Awake() {
        _gameTimer = (CountdownTimer)GetComponent("CountdownTimer");
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

