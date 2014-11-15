#pragma strict

public class InGameMenu extends MonoBehaviour
{
	public var prompt:TextMesh;
	public var optionA:TextAdventureMenu;
	public var optionB:TextAdventureMenu;
	public var optionX:TextAdventureMenu;

	function Start () 
	{
		Debug.Log(Player.instance);
		optionA.SetOption("test","");
		optionA.gameObject.active = true;
	}
	
	function LoadQuestion()
	{
	
	}
	
	function Update () 
	{
	
		if(Player.instance.state == PlayerState.Question )
		{
			Player.instance.CheckForAnswer();
		}
		
		// Only triggers if the player has answered a question.
		if(Player.instance.state == PlayerState.Answered)
		{			
			var response:Response = Player.instance.response;
			
			switch (response)
			{
				case Response.A:
					optionA.OnMouseUp();
					break;
				case Response.B:
					optionB.OnMouseUp();
					break;
				case Response.X:
					optionX.OnMouseUp();
					break;
			}
			
		}
	}
	
	
}