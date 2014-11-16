using UnityEngine;
using System.Collections;

public class ObstacleManager : MonoBehaviour {
	
	public GameObject deerBillboard;
	public GameObject otherBillboard;
	public GameObject rockBillboard;
	public GameObject treeBillboard;
	ArrayList obstacleList;

	float spawnTimer= 0.5f;
	float currentTimer= 0.0f;
	int obstacleType = 0;
	float curSpeed= 100.0f;
	GameObject shitmobile;
	// Use this for initialization
	void Start () {
		obstacleList= new ArrayList();
		shitmobile = GameObject.Find("shitmobile");
	}
	
	// Update is called once per frame
	void Update () {
		curSpeed+=Time.deltaTime*10.0f;
		currentTimer+=Time.deltaTime;
		if(currentTimer > spawnTimer){
			currentTimer =0.0f;

			obstacleType = (obstacleType +1)%4;
			GameObject toSpawn = new GameObject();
			switch(obstacleType){
			case 0:
				toSpawn=deerBillboard;
				break;
			case 1:
				toSpawn=rockBillboard;
				break;
			case 2:
				toSpawn=treeBillboard;
				break;
			case 3:
				toSpawn=otherBillboard;
				break;

			}
			GameObject curObstacle= (GameObject)GameObject.Instantiate(toSpawn,new Vector3(-500,5,Random.Range(-20,50)),Quaternion.identity);
			obstacleList.Add(curObstacle);

		}
		GameObject toRemove =null;
		foreach(GameObject g in obstacleList){
			Vector3 newVector =  g.transform.position;
			newVector.x+= Time.deltaTime * curSpeed;
			g.transform.position= newVector;

			float shitZ = shitmobile.transform.position.z;
			if(g.transform.position.x>-15.0f && g.transform.position.x <15.0f && Mathf.Abs(g.transform.position.z-shitZ)<4.0f){//collision detection
				toRemove= g;
			}

		}
		if(toRemove!=null){//Game over
			obstacleList.Remove(toRemove);
			Destroy(toRemove);
		}

	
	}
}
