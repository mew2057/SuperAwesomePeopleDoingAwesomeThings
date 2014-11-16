using UnityEngine;
using System.Collections;

public class InputManager : MonoBehaviour {

	// Use this for initialization
	bool mouseDown= false;
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetMouseButtonDown(0) && !mouseDown){
			mouseDown= true;
			Debug.Log("test");
		}

		if(Input.GetMouseButtonUp(0)){
			mouseDown=false;
		}
	}
}
