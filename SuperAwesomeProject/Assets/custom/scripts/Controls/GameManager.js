#pragma strict

public enum GameState
{
	Waiting,
	Driving,
	Question, // A Question is on screen.
	Answered, 
	Failed
}

public class GameManager extends MonoBehaviour
{	
	// The Game State
	public var state:GameState = GameState.Waiting;
	public var player:Player;
	public var timeBetweenChoices:float = 60;
	
	// The choices for the main scene (can be thought of as a stack).
	public var mainSceneChoices:Choice[];
	
	// The current choice that is being played out.
	public var currentChoice:Choice;
	
	public static var Instance:GameManager;

	public var regularCamera:GameObject;
	public var ovrCamera:GameObject;
	
	public static var MainCamera:GameObject;
	
	private var terrainChunk1:GameObject;
	private var terrainChunk2:GameObject;
	public var terrainChunk:GameObject;
	public var carSpeed:float= 100.0f;

	function Awake()
	{
		// Catches errant game managers.
		if(Instance)
		{
			Destroy(this);
			return;
		}
		
		Instance = this;
		this.state = GameState.Waiting;
		
		DontDestroyOnLoad(gameObject);
		
		if (OVRManager.display.isPresent)
		{
			regularCamera.SetActive(false);
			ovrCamera.SetActive(true);
			MainCamera = ovrCamera;
			
		}
		else
		{
			regularCamera.SetActive(true);
			ovrCamera.SetActive(false);
			MainCamera = regularCamera;
		}
	}
	
	// Reacts to context switching.
	function AnswerRecieved()
	{
		if(this.state != GameState.Failed)
		{
			player.AnswerRecieved();
		}

	}
	
	function SetGlobalChoices(choices:Choice[])
	{
		this.mainSceneChoices = choices;
		
		var swapIndex:int = 0;
		var scratchChoice:Choice;
	}
	
	function SetSceneStartChoice(choice:Choice)
	{
		this.currentChoice = choice;
	}
	
	function Start () {
		var chunkSize:Vector3 = terrainChunk.GetComponentInChildren(Terrain).terrainData.size;
		
		terrainChunk1 = Instantiate(terrainChunk,Vector3(-chunkSize.x,0,0),Quaternion.identity);
		terrainChunk2 = Instantiate(terrainChunk,Vector3(0,0,0),Quaternion.identity);
	}

	function Update () {
		var curLocation:Vector3 = terrainChunk1.transform.position;

		curLocation.x+= carSpeed*Time.deltaTime;
		var diff:float;
		if(curLocation.x>0.0){
			diff=curLocation.x-1000.0f;
			curLocation.x=-1000.0f+diff;
		}
		terrainChunk1.transform.position=curLocation;
		curLocation = terrainChunk2.transform.position;
		curLocation.x+= carSpeed*Time.deltaTime;
		if(curLocation.x>1000.0){
			diff=curLocation.x-1000.0f;
			curLocation.x=-1000.0f+diff;
		}
		terrainChunk2.transform.position=curLocation;
	}
}