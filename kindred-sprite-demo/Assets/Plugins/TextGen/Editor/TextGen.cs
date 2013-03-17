using UnityEditor;
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class TextGen : EditorWindow
{
	public Object file = null;

	// Add menu item named "My Window" to the Window menu
	[MenuItem("File/Import TextGen File...")]
	public static void ImportTextGenFile ()
	{
		//Show existing window instance. If one doesn't exist, make one.
		EditorWindow.GetWindow (typeof(TextGen));
	}

	public void OnGUI ()
	{
		GUILayout.Label ("Base Settings", EditorStyles.boldLabel);
		file = EditorGUILayout.ObjectField ("Text Gen File", file, typeof(Object));
		GUILayout.BeginArea (new Rect (240, 50, 100, 100));
		if (GUILayout.Button ("Import!", GUILayout.Width (60))) {
			DoImport ();
			file = null;
			this.Close ();
		}
		GUILayout.EndArea ();
	}

	public void DoImport ()
	{
		if (file != null) {
			TextAsset textGenFile = (TextAsset)file;
			string keyLine = null;
			bool recording = false;
			int scale = 1;
			Object[] sprites = FindObjectsOfType (typeof(Sprite));
			Hashtable gameObjects = new Hashtable ();
			List<string> map = new List<string> ();
			string[] result = Regex.Split (textGenFile.text, "\r?\n");
			foreach (string line in result) {
				if (line.StartsWith (";=")) {
					keyLine = Regex.Replace (line, ";=", "");
					string[] keyValue = keyLine.Split (':');
					foreach (Object sprite in sprites) {
						if (sprite.name == keyValue [1]) {
							gameObjects.Add (keyValue [0], sprite);
						}
					}
				} else if (line.StartsWith (";s")) {
					scale = int.Parse (Regex.Replace (line, ";s", ""));
				} else if (line.StartsWith (";+")) {
					recording = true;
				} else if (recording && !line.StartsWith (";")) {
					map.Add (line);
				}
			}
			
			map.Reverse ();
			for (var y = 0; y < map.Count; y++) {
				string line = map [y];
				
				for (var x = 0; x < line.Length; x++) {
					string key = line [x].ToString ();
					if (key != " ") {
						Sprite sprite = (Sprite)gameObjects [key];
						Object prefabRoot = PrefabUtility.GetPrefabParent (sprite.gameObject);
						Object dupe = PrefabUtility.InstantiatePrefab (prefabRoot);
						dupe.name = sprite.gameObject.name;
						Sprite dupeSprite = ((GameObject)dupe).GetComponent<Sprite> ();
						dupeSprite.spriteContainer = sprite.spriteContainer;
						dupeSprite.frameIndex = sprite.frameIndex;
						((GameObject)dupe).transform.position = new Vector3 (x * scale, y * scale, 0);
					}
				}
			}
			
			// Destroy the source instances
			foreach (DictionaryEntry pair in gameObjects) {
				DestroyImmediate (((Sprite)pair.Value).gameObject);
			}
		}
	}
}
