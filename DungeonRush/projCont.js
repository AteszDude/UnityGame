#pragma strict

var owner : GameObject;

function Start () {

}

function Update () {
	
}

function OnTriggerEnter(other : Collider) {
	if(other.gameObject == owner) return;
	else if(other.name == "3rd Person Controller") {
		Debug.Log("Hit a projectile!!!");
		GameObject.Find("mapDeco").GetComponent(GameController).playerHit();
	
		UnityEngine.Object.Destroy(this.gameObject);	
	}
	else if(other.name != "projectile")
	UnityEngine.Object.Destroy(this.gameObject);
//	else if(other.name == "leftBorder" || other.name == "rightBorder"
//	|| other.name == "finishLine" || other.name == "startLine") {
//		UnityEngine.Object.Destroy(this.gameObject);	
//	}
}
