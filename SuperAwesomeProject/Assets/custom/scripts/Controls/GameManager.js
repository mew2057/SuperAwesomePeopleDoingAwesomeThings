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
	
	public var inMainScene:boolean = false;

	
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
	
		// Shuffles the choices so they're always presented differently.		
		for(var i = this.mainSceneChoices.Length -1; i > 0; --i) 
		{
			scratchChoice = this.mainSceneChoices[i];			
			swapIndex = Random.Range(0,i);
			this.mainSceneChoices[i] = this.mainSceneChoices[swapIndex];
			this.mainSceneChoices[swapIndex] = scratchChoice;
		}
	}
	
	function SetSceneStartChoice(choice:Choice)
	{
		this.currentChoice = choice;
	}
	
	function Start () 
	{
	}
	
	
	function Update () {

	}
	
	function OnLevelWasLoaded()
	{
		Debug.Log("made it");
	}
}
