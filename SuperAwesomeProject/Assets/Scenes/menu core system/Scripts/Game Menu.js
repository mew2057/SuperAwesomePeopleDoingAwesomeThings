var isGame=false;
var isDev=false;
var isQuit=false;
var musicRunning=false;
var currentTime:float =0.0f;
var menuMusic:AudioClip;

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
	if (isGame==true) {
		//quit the game
		Application.LoadLevel("AlexScene2");
	}
	if (isQuit==true) {
		//quit the game
		Application.Quit();
	}
	else {
		//load level
		//Application.LoadLevel(1);
	}
}

function Update(){
	//quit game if escape key is pressed
	if(!musicRunning && isGame){
		musicRunning=true;
		AudioSource.PlayClipAtPoint(menuMusic,this.transform.position);
	}else if(isGame){
		currentTime+=Time.deltaTime;
		if(currentTime>15.0f){
			currentTime=0.0f;
			AudioSource.PlayClipAtPoint(menuMusic,this.transform.position);
		}
	}
	if (Input.GetKey(KeyCode.Escape)) {
    		Application.Quit();
	}
}