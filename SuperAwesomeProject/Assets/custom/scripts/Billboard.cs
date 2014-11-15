using UnityEngine;
using System.Collections;

public class Billboard : MonoBehaviour {

	public GameObject cameraToSeek;
	// Use this for initialization
	void Start () {
		cameraToSeek = GameObject.FindGameObjectWithTag("MainCamera");
	}
	
	// Update is called once per frame
	void Update () {
		transform.LookAt(new Vector3(cameraToSeek.transform.position.x,this.transform.position.y,cameraToSeek.transform.position.z));
		transform.Rotate(new Vector3(0.0f,180.0f,0.0f));
	}
}
