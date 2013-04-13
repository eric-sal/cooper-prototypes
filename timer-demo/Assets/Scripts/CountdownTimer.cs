using UnityEngine;
using System;
using System.Collections;

// This is ticking off seconds slower than realtime. Why?
public class CountdownTimer : MonoBehaviour {

    /* *** Member Variables *** */

    public float startTime = 0;
    public bool countDown = true;   // count up or down
    public float timeScale = 1;     // Adjust the speed at which the timer counts

    private bool _paused = false;
    private float _currentTime;
    private float _previousTime;

    /* *** "Contstructors" (Start, Awake) *** */

    public void Awake() {
        _currentTime = startTime;
        _previousTime = _currentTime;
    }

    /* *** Properties *** */

    public float currentTime {
        get { return _currentTime; }
    }

    public bool paused {
        get { return _paused; }
    }

    public int hours {
        get { return Mathf.FloorToInt(currentTime / 3600); }
    }

    public int minutes {
        get { return Mathf.FloorToInt((currentTime - hours * 3600) / 60); }
    }

    public int seconds {
        get { return Mathf.FloorToInt(currentTime - hours * 3600 - minutes * 60); }
    }

    public int milliseconds {
        get { return Mathf.FloorToInt((currentTime - (float)Math.Truncate(currentTime)) * 100); }
    }

    public float deltaTime {
        get { return Mathf.Abs(_previousTime - _currentTime); }
    }

    /* *** MonoBehaviour/Overrideable Methods *** */

    public void FixedUpdate() {
        if (!paused) {
            _previousTime = _currentTime;
            float deltaTime = Time.deltaTime * timeScale;

            if (countDown) {
                deltaTime *= -1;
            }
    
            _currentTime += deltaTime;
        }
    }

    /* *** Public Methods *** */

    public void Pause() {
        _paused = true;
    }

    public void Unpause() {
        _paused = false;
    }

    public override string ToString() {
        return hours.ToString("D2") + ":" + minutes.ToString("D2") + ":" + seconds.ToString("D2") + ":" + milliseconds.ToString("D2");
    }
}
