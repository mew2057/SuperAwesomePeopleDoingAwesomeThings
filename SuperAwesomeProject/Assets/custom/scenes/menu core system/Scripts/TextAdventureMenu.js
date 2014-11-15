#pragma strict

@script RequireComponent(TextMesh)

public class TextAdventureMenu extends MonoBehaviour
{
	var textMesh:TextMesh;
	var scene:String;
	
	function Awake()
	{
		textMesh = GetComponent("TextMesh") as TextMesh;
	}
	
	function SetOption( newText:String, newScene:String )
	{
		textMesh.text = newText;
		scene         = newScene;		
	}
	
	function OnMouseEnter(){
		//change text color
		renderer.material.color=Color.yellow;
	}

	function OnMouseExit(){
		//change text color
		renderer.material.color=Color.white;
	}

	function OnMouseUp()
	{
		Player.instance.AnswerRecieved();
		
		Application.LoadLevel(scene);		
	}

	function Update(){
		//quit game if escape key is pressed
		if (Input.GetKey(KeyCode.Escape)) {
	    		Application.Quit();
		}
	}
}