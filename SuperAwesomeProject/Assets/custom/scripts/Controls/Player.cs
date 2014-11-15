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
	public float failThreshold = 0.9f;

	// Effectively the game state, managed in the controller.
	public PlayerState state = PlayerState.Waiting;

	public Response response = Response.None;

	// Ensure the state starts at waiting.
	void Start () {
		this.state    = PlayerState.Waiting;
		this.response = Response.None;
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

		// If we're playing and the player releases either axis they've lost. 
		if( this.state != PlayerState.Waiting && 
		   ( Input.GetAxis ("Trigger_Right") < failThreshold || Input.GetAxis ("Trigger_Left") < failThreshold ) )
		{
			TriggerFailure();
		}

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
		if( Input.GetAxis ("Trigger_Right") < failThreshold && Input.GetAxis ("Trigger_Left") < failThreshold )
		{
			this.state = PlayerState.Driving;
		}
	}

	public void CheckForAnswer()
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

		if(this.state != PlayerState.Failed)
		{
			this.state = PlayerState.Answered;
		}
	}

	public void AnswerRecieved()
	{
		if(this.state != PlayerState.Failed)
		{
			this.CheckReady();
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
