using UnityEngine;
using System.Collections;

public class InputManager : MonoBehaviour {

	// Use this for initialization
	bool mouseDown= false;
	float maxZ= 38.0f;
	float minZ= -22.0f;
	float zVelocity = 0.0f;
	GameObject mainPlayer;
	void Start () {
		mainPlayer= GameObject.Find("Player");
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetMouseButtonDown(0) && !mouseDown){
			mouseDown= true;
			zVelocity-=20.0f;
		}

		if(Input.GetMouseButtonUp(0)){
			mouseDown=false;
		}

		Vector3 curPosition= mainPlayer.transform.position;
		zVelocity+=40.0f * Time.deltaTime;
		curPosition.z+=Time.deltaTime * zVelocity;


		if(curPosition.z>maxZ){
			curPosition.z=maxZ;
			zVelocity=0.0f;
		}

		if(curPosition.z<minZ){
			curPosition.z=minZ;
			zVelocity=0.0f;
		}

		mainPlayer.transform.position = curPosition;

	}
}
