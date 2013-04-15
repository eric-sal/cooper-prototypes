using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;

public class CountdownGUI : MonoBehaviour {
    public enum Position {
        Hundreths,
        Tenths,
        SecondsOnes,
        SecondsTens,
        MinutesOnes,
        MinutesTens,
        HoursOnes,
        HoursTens
    };

    public Position position;
    public double startingRotationX;
    public bool continuous = true;

    private GameTimer _gameTimer;
    private double _currentTime = 0;
    private double _tickTime = 0;
    private double _currentX;

    private float _rotationSpeed;   // degrees per second
    private Dictionary<Position, float> _rotationSpeeds = new Dictionary<Position, float>() {
        { Position.Hundreths, -3600 }, { Position.Tenths, -360 }, { Position.SecondsOnes, -36 },
        { Position.SecondsTens, -6 }, { Position.MinutesOnes, -0.6f }, { Position.MinutesTens, -0.1f },
        { Position.HoursOnes, -0.01f }, { Position.HoursTens, -0.0016666667f }
    };

    private float _timeUnit;
    private Dictionary<Position, float> _timeUnits = new Dictionary<Position, float>() {
        { Position.Hundreths, 0.01f }, { Position.Tenths, 0.01f }, { Position.SecondsOnes, 1.0f },
        { Position.SecondsTens, 10.0f }, { Position.MinutesOnes, 60.0f }, { Position.MinutesTens, 600.0f },
        { Position.HoursOnes, 3600.0f }, { Position.HoursTens, 36000.0f }
    };

    public void Start() {
        _gameTimer = (GameTimer)GameObject.Find("SceneController").GetComponent("GameTimer");
        _rotationSpeed = _rotationSpeeds[position];
        _timeUnit = _timeUnits[position];
        _currentX = startingRotationX;
        transform.rotation = Quaternion.Euler((float)startingRotationX, 0, 90);
    }

    public void FixedUpdate() {
        if (!_gameTimer.paused) {
            double dt = _gameTimer.deltaTime;
            _currentX += _rotationSpeed * dt;

            if (continuous) {
                transform.rotation = Quaternion.Euler((float)_currentX, 0, 90);
            } else {
                _tickTime += dt;
                if (_tickTime >= _timeUnit) {
                    // I'll have to write my own animation for a smooth rotation from previous position to new position.
                    // Because of the way Unity stores rotations as quaternions (and I don't know what that means).
                    transform.rotation = Quaternion.Euler((float)_currentX, 0, 90);
                    _tickTime = _tickTime - _timeUnit;
                }
            }
        }
    }
}
