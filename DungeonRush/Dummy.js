#pragma strict

public var x = 0;
public var z = 0;
var timer : float;
var isHit : boolean;
var rotateDir : int = 1;

function Start () {
isHit = false;
}

function Update () {
	if(!(GameObject.Find("mapDeco").GetComponent(GameController).State == "Attack"))
			return;

 if(isHit) timer += Time.deltaTime;
 if(timer > 1) isHit = false;

this.transform.Rotate(0, rotateDir * 60 * Time.deltaTime, 0);
}

function OnTriggerEnter(other : Collider) {
	if(other.name == "3rd Person Controller") {
	if(isHit) return;
	timer = 0;
	isHit = true;
	GameObject.Find("mapDeco").GetComponent(GameController).playerHit();
}
	else if(other.name != "projectile")rotateDir *= -1;
}
