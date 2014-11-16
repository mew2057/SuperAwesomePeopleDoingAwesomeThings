using UnityEngine;
using System.Collections;

public class CarSpeed : MonoBehaviour {

	public float carSpeed= 100.0f;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		carSpeed+=(Time.deltaTime * 5.0f);
	}
}
