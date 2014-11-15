var isMainMenu=false;
var isPrevious=false;
var isNext=false;

function OnMouseEnter(){
	//change text color
	renderer.material.color=Color.red;
}

function OnMouseExit(){
	//change text color
	renderer.material.color=Color.white;
}

function OnMouseUp(){
	//is this quit
	if (isMainMenu==true) {
		//quit the game
		Application.LoadLevel(0);
	}
	if (isPrevious==true) {
		//quit the game
		//Application.LoadLevel(X);
	}
	if (isNext==true) {
		//quit the game
		//Application.LoadLevel(X);
	}
	else {
		//load level
		//Application.LoadLevel(X);
	}
}

function Update(){
	//quit game if escape key is pressed
	if (Input.GetKey(KeyCode.Escape)) {
    		Application.Quit();
	}
}