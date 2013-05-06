#pragma strict

var gameControllerScript:GameController;

// You call the OnTriggerEnter() function whenever another collider enters the GameObject. 
function OnTriggerEnter(other:Collider)
{
	if (other.gameObject.tag == "Player")
	{
		Debug.Log("You made it!!!");
		gameControllerScript.MissionComplete();
	}
}

@script RequireComponent(Collider)