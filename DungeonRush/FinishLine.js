#pragma strict

function Start () {

}

function Update () {
	
}

function OnTriggerEnter(other : Collider) {
	if(other.name == "3rd Person Controller") {
		Debug.Log("Finish!");
		//Call the GameController
		GameObject.Find("mapDeco").GetComponent(GameController).stageFinished();
	} 
}
