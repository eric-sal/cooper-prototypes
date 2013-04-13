using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class CountdownGUI : MonoBehaviour {
    public enum Position { Hundreths, Tenths, SecondsOnes, SecondsTens, MinutesOnes, MinutesTens, HoursOnes, HoursTens };
    public Position position;
    public float startingRotationX;
    public bool continuous = true;

    private CountdownTimer _gameTimer;
    private float _currentTime = 0;
    private float _tickTime = 0;

    private float _rotationSpeed;
    private Dictionary<Position, float> _rotationSpeeds = new Dictionary<Position, float>() {
        { Position.Hundreths, 10.0f }, { Position.Tenths, 1.0f }, { Position.SecondsOnes, 0.1f },
        { Position.SecondsTens, 0.0166666667f }, { Position.MinutesOnes, 0.0016666667f }, { Position.MinutesTens, 0.0001666667f },
        { Position.HoursOnes, 0.00001f }, { Position.HoursTens, 0.0000016667f }
    };

    private float _timeUnit;
    private Dictionary<Position, float> _timeUnits = new Dictionary<Position, float>() {
        { Position.Hundreths, 0.01f }, { Position.Tenths, 0.01f }, { Position.SecondsOnes, 1.0f },
        { Position.SecondsTens, 10.0f }, { Position.MinutesOnes, 60.0f }, { Position.MinutesTens, 600.0f },
        { Position.HoursOnes, 3600.0f }, { Position.HoursTens, 36000.0f }
    };

    public void Start() {
        _gameTimer = (CountdownTimer)GameObject.Find("SceneController").GetComponent("CountdownTimer");
        _rotationSpeed = _rotationSpeeds[position];
        _timeUnit = _timeUnits[position];
        transform.rotation = Quaternion.Euler(startingRotationX, 0, 90);
    }

    public void FixedUpdate() {
        float dt = _gameTimer.deltaTime;
        _currentTime += dt;

        float rotationX = startingRotationX + _rotationSpeed * _currentTime * -360;

        if (continuous) {
            transform.rotation = Quaternion.Euler(rotationX, 0, 90);
        } else {
            _tickTime += dt;
            if (_tickTime >= _timeUnit) {
                // I'll have to write my own animation for a smooth rotation from previous position to new position.
                // Because of the way Unity stores rotations as quaternions (and I don't know what that means).
                transform.rotation = Quaternion.Euler(rotationX, 0, 90);
                _tickTime = _tickTime - _timeUnit;
            }
        }
    }
}
