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
		
	}

	function Update () {

	}
}