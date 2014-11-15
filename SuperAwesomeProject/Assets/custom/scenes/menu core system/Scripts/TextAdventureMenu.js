var isOption1=false;
var isOption2=false;
var isOption3=false;

function OnMouseEnter(){
	//change text color
	renderer.material.color=Color.yellow;
}

function OnMouseExit(){
	//change text color
	renderer.material.color=Color.white;
}

function OnMouseUp(){
	//is this quit
	if (isOption1==true) {
		//quit the game
		Application.LoadLevel("Scene_X");
	}
	else if (isOption2==true) {
		//quit the game
		Application.LoadLevel("Scene_Y");
	}
	else if (isOption3==true) {
		//quit the game
		Application.LoadLevel("Scene_Z");
	}
	else {
		//load level
		//Application.LoadLevel(1);
	}
}

function Update(){
	//quit game if escape key is pressed
	if (Input.GetKey(KeyCode.Escape)) {
    		Application.Quit();
	}
}