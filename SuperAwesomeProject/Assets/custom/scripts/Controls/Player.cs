using UnityEngine;
using System.Collections;

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

public class Player : MonoBehaviour {

	// If a trigger value is less than this number the player has failed.
	// 1 is fully in.
	public float failThreshold = 0.9f;

	// Effectively the game state, managed in the controller.
	public PlayerState state = PlayerState.Waiting;

	public Response response = Response.None;

	public bool usingController = false;

	public GameObject regularCamera;
	public GameObject ovrCamera;

	// Ensure the state starts at waiting.
	void Start () 
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
	void FixedUpdate () {

		if( this.state == PlayerState.Waiting )
		{
			this.CheckReady();
		}
		else if( this.state == PlayerState.Question)
		{
			this.CheckForAnswer();
		}

		// TODO keyboard version.
		// If we're playing and the player releases either axis they've lost. 
		if( this.state != PlayerState.Waiting && (this.CheckKeyboardFail() ||this.CheckControllerFail()))
		{
			TriggerFailure();
		}

	}

	public bool CheckKeyboardFail()
	{
		return this.usingController && (Input.GetAxis ("Trigger_Right") < failThreshold || Input.GetAxis ("Trigger_Left") < failThreshold);
	}

	public bool CheckControllerFail()
	{
		return !this.usingController && ( !Input.GetButton ("Mouse") || !Input.GetButton ("Space"));
	}

	// The player has released the controller triggers,therefore they've FAILED.
	public void TriggerFailure ()
	{
		Debug.Log ("you lose");
		this.state = PlayerState.Failed;
	}

	// Checks to see if the player has met the requirements for the ready state.
	public void CheckReady()
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

	public void CheckForAnswer()
	{
		// TODO keyboard version.
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

	public void AnswerRecieved()
	{
		if(this.state != PlayerState.Failed)
		{
			this.response = Response.None;
			this.state = PlayerState.Driving;
		}

	}

	public void PresentQuestion()
	{
		if(this.state != PlayerState.Failed)
		{
			this.state = PlayerState.Question;
		}
	}
}
