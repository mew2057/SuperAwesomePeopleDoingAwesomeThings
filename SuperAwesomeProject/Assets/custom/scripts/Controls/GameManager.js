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
	
	public static var Instance:GameManager;

	
	function Awake()
	{
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
	
	function Start () {
		
	}

	function Update () {

	}
}