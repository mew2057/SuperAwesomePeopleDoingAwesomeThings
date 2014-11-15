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
	public var mainChoices:Choice[];
	
	// The current choice that is being played out.
	public var currentChoice:Choice;
	
	public static var Instance:GameManager;

	
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
		this.mainChoices = choices;
		// TODO do a shuffle here.
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