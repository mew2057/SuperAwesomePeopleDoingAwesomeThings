#pragma strict




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

	public var response:Response = Response.None;

	public var usingController:boolean = false;

	public var regularCamera:GameObject;
	public var ovrCamera:GameObject;

	function Awake()
	{
	}


	// Ensure the state starts at waiting.
	function Start () 
	{
		GameManager.Instance.state = GameState.Waiting;
		GameManager.Instance.player = this;
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

		if( GameManager.Instance.state == GameState.Waiting )
		{
			this.CheckReady();
		}
		else if( GameManager.Instance.state == GameState.Question && this.usingController)
		{
			this.CheckForAnswer();
		}

		// If we're playing and the player releases either axis they've lost. 
		if( GameManager.Instance.state != GameState.Waiting && (this.CheckKeyboardFail() ||this.CheckControllerFail()))
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
		GameManager.Instance.state = GameState.Failed;
	}

	// Checks to see if the player has met the requirements for the ready state.
	function CheckReady()
	{
		if( Input.GetAxis ("Trigger_Right") > failThreshold && Input.GetAxis ("Trigger_Left") > failThreshold)
		{
			this.usingController = true;
			GameManager.Instance.state = GameState.Driving;
		}
		else if(Input.GetButton ("Mouse") && Input.GetButton ("Space"))
		{
			this.usingController = false;
			GameManager.Instance.state = GameState.Driving;
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
		}/*
		else if(Input.GetButton("Y"))
		{
			this.response = Response.Y;
		}*/
		else if(Input.GetButton("B"))
		{
			this.response = Response.B;
		}

		if(GameManager.Instance.state != GameState.Failed && this.response != Response.None)
		{
			GameManager.Instance.state = GameState.Answered;
		}
	}

	function AnswerRecieved()
	{
		this.response = Response.None;
		GameManager.Instance.state = GameState.Driving;
	}

	function PresentQuestion()
	{
		if(GameManager.Instance.state != GameState.Failed)
		{
			GameManager.Instance.state = GameState.Question;
		}
	}
}
