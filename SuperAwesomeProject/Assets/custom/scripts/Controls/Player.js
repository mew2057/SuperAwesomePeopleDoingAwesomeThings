#pragma strict


public enum PlayerState
{
	Waiting,
	Driving,
	Question, // A Question is on screen.
	Answered, 
	Failed
}

public enum Response
{
	None,
	A,
	B,
	X,
	Y
}

public class Player extends MonoBehaviour {

	// If a trigger value is less than this number the player has failed.
	// 1 is fully in.
	public var failThreshold:float = 0.9f;

	// Effectively the game state, managed in the controller.
	public var state:PlayerState = PlayerState.Waiting;

	public var response:Response = Response.None;

	public var usingController:boolean = false;

	public var regularCamera:GameObject;
	public var ovrCamera:GameObject;

	public static var instance:Player;

	function Awake()
	{
	// Should only be one
		this.instance = this;
	}


	// Ensure the state starts at waiting.
	function Start () 
	{
		this.state    = PlayerState.Waiting;
		this.response = Response.None;

		if (OVRManager.display.isPresent)
		{
			regularCamera.SetActive(false);
			ovrCamera.SetActive(true);
		}
		else
		{
			regularCamera.SetActive(true);
			ovrCamera.SetActive(false);
		}
	}
		
		// Fixed update for the control monitoring.
	function FixedUpdate () {

		if( this.state == PlayerState.Waiting )
		{
			this.CheckReady();
		}
		else if( this.state == PlayerState.Question && this.usingController)
		{
			this.CheckForAnswer();
		}

		// If we're playing and the player releases either axis they've lost. 
		if( this.state != PlayerState.Waiting && (this.CheckKeyboardFail() ||this.CheckControllerFail()))
		{
			TriggerFailure();
		}

	}

	function CheckKeyboardFail() : boolean
	{
		return this.usingController && (Input.GetAxis ("Trigger_Right") < failThreshold || Input.GetAxis ("Trigger_Left") < failThreshold);
	}

	function  CheckControllerFail() : boolean
	{
		return !this.usingController && ( !Input.GetButton ("Mouse") || !Input.GetButton ("Space"));
	}

	// The player has released the controller triggers,therefore they've FAILED.
	function TriggerFailure ()
	{
		this.state = PlayerState.Failed;
	}

	// Checks to see if the player has met the requirements for the ready state.
	function CheckReady()
	{
		if( Input.GetAxis ("Trigger_Right") > failThreshold && Input.GetAxis ("Trigger_Left") > failThreshold)
		{
			this.usingController = true;
			this.state = PlayerState.Driving;
		}
		else if(Input.GetButton ("Mouse") && Input.GetButton ("Space"))
		{
			this.usingController = false;
			this.state = PlayerState.Driving;
		}
	}

	function CheckForAnswer() 
	{
		if(Input.GetButton("A"))
		{
			this.response = Response.A;
		}
		else if(Input.GetButton("X"))
		{
			this.response = Response.X;
		}
		else if(Input.GetButton("Y"))
		{
			this.response = Response.Y;
		}
		else if(Input.GetButton("B"))
		{
			this.response = Response.B;
		}

		if(this.state != PlayerState.Failed && this.response != Response.None)
		{
			this.state = PlayerState.Answered;
		}
	}

	function AnswerRecieved()
	{
		if(this.state != PlayerState.Failed)
		{
			this.response = Response.None;
			this.state = PlayerState.Driving;
		}

	}

	function PresentQuestion()
	{
		if(this.state != PlayerState.Failed)
		{
			this.state = PlayerState.Question;
		}
	}
}
