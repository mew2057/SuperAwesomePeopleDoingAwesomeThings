#pragma strict

class Prompt extends System.Object
{
	var text:String;
	var soundByte:AudioClip;
}

class Option extends Prompt {
	var scene:String;
	var nextChoice:Choice;
	// TODO hook events into this.
}

public class Choice extends MonoBehaviour
{
	public var key:String;
	public var prompt:Prompt;
	public var optionA:Option;
	public var optionB:Option;
	public var optionX:Option;
	
}