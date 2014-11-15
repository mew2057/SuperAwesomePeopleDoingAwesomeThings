#pragma strict
@script RequireComponent(Light)
var light:Light;
var minTimeToFlicker:float = 5;
var maxTimeToFlicker:float = 10;
var minFlickerTime:float   = .2;
var maxFlickerTime:float   = .5;

function Start () {
	Flicker();
}
function Flicker()
{
	while(true)
	{
		yield WaitForSeconds(Random.Range(minTimeToFlicker,maxTimeToFlicker));
		GetComponent(Light).enabled = false;
		yield WaitForSeconds(Random.Range(minFlickerTime,maxFlickerTime));
		GetComponent(Light).enabled = true;
	}
}

function Update () 
{	
	
}