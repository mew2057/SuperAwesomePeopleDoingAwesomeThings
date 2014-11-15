#pragma strict

// If a scene Choice the first is always the entry point to the conversation tree.
public class ChoiceManager extends MonoBehaviour
{
	public var isMainScene:boolean = false;
	public var choices:Choice[];
	
	function Start () {
		// Gets the choices from the children and links them.
		var i:int = 0;
		var choices : Component[] = GetComponentsInChildren(Choice);
		
		this.choices = new Choice[choices.Length];		
		
		for (var choice : Choice in choices) {
			this.choices[i++] = choice;
		}
		
		// Don't kill if the main scene choice manager.
		if(isMainScene)
		{		
			GameManager.Instance.SetGlobalChoices(this.choices);
			DontDestroyOnLoad(gameObject);
		}
		else
		{
			GameManager.Instance.SetSceneStartChoice(this.choices[0]);
		}
	}
	function Update () {

	}
}

