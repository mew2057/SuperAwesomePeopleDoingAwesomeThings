using UnityEngine;
using System.Collections;

public class SceneManager : MonoBehaviour {

	GameObject terrainChunk1;
	GameObject terrainChunk2;
	public GameObject terrainChunk;
	public float carSpeed= 100.0f;
	// Use this for initialization
	void Start () {
		Vector3 chunkSize = terrainChunk.GetComponentInChildren<Terrain> ().terrainData.size;

		terrainChunk1= (GameObject)GameObject.Instantiate(terrainChunk,new Vector3(-chunkSize.x,0,0),new Quaternion());
		terrainChunk2 = (GameObject)GameObject.Instantiate(terrainChunk,new Vector3(0,0,0),new Quaternion());
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 curLocation = terrainChunk1.transform.position;

		curLocation.x+= carSpeed*Time.deltaTime;

		if(curLocation.x>0.0){
			float diff=curLocation.x-1000.0f;
			curLocation.x=-1000.0f+diff;
		}
		terrainChunk1.transform.position=curLocation;
		curLocation = terrainChunk2.transform.position;
		curLocation.x+= carSpeed*Time.deltaTime;
		if(curLocation.x>1000.0){
			float diff=curLocation.x-1000.0f;
			curLocation.x=-1000.0f+diff;
		}
		terrainChunk2.transform.position=curLocation;
	}
}
