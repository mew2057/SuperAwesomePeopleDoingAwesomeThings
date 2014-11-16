#pragma strict

class Prompt extends System.Object
{
	var text:String;
	var soundByte:AudioClip;
	var audioSource:AudioSource;
}

class Option extends Prompt {
	var nextChoice:Choice;
	// TODO hook events into this.
}

public class Choice extends MonoBehaviour
{
	public var scene:String;

	public var prompt:Prompt;
	public var optionA:Option;
	public var optionB:Option;
	public var optionX:Option;	
}