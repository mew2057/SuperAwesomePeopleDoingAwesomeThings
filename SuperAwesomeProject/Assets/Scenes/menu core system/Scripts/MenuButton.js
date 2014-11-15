
function OnMouseEnter(){
	//change text color
	renderer.material.color=Color.red;
}

function OnMouseExit(){
	//change text color
	renderer.material.color=Color.white;
}

function OnMouseUp(){
	//load level
	Application.LoadLevel(GetComponent(TextMesh).text);
}

function Update(){
	//quit game if escape key is pressed
	if (Input.GetKey(KeyCode.Escape)) {
    		Application.Quit();
	}
}