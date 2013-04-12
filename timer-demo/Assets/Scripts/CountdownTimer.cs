using UnityEngine;
using System;
using System.Collections;

public class CountdownTimer : MonoBehaviour {
    /* *** Member Variables *** */

    public float startTime = 21600;

    private float _currentTime;
    private bool _paused = false;

    /* *** "Contstructors" (Start(), Awake()) *** */

    public void Awake() {
        _currentTime = startTime;
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

    /* *** MonoBehaviour Methods *** */

    public void Update() {
        if (!paused) {
            _currentTime -= Time.deltaTime;
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

    /* *** Protected Methods *** */

    /* *** Private Methods *** */
}
