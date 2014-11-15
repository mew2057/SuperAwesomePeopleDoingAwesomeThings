#pragma strict

public class InGameMenu extends MonoBehaviour
{
	public var prompt:TextMesh;
	public var optionA:TextAdventureMenu;
	public var optionB:TextAdventureMenu;
	public var optionX:TextAdventureMenu;

	function Start () 
	{
		optionA.SetOption("test","");
		optionA.gameObject.active = true;
	}
	
	function LoadQuestion()
	{
	
	}
	
	function Update () 
	{
	
		if(GameManager.Instance.state == GameState.Question )
		{
			GameManager.Instance.player.CheckForAnswer();
		}
		
		// Only triggers if the player has answered a question.
		if(GameManager.Instance.state == GameState.Question)
		{			
			var response:Response = GameManager.Instance.player.response;
			
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