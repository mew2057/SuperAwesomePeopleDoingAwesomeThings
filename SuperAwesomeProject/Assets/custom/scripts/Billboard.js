#pragma strict

public class Billboard extends MonoBehaviour {

	public var cameraToSeek:GameObject;
	// Use this for initialization
	function Start () {
		cameraToSeek = GameManager.Instance.MainCamera;
	}
	
	// Update is called once per frame
	function Update () {
		transform.LookAt(new Vector3(cameraToSeek.transform.position.x,this.transform.position.y,cameraToSeek.transform.position.z));
		transform.Rotate(new Vector3(0.0f,180.0f,0.0f));
	}
}
