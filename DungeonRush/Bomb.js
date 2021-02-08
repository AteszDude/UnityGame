#pragma strict

var maxBomb : int = 1;
var actBomb : int = 0;

function Start () {
maxBomb = 1;
actBomb = 0;
}

function Update () {
	if(!(GameObject.Find("mapDeco").GetComponent(GameController).State == "Attack"))
			return;
			
	if (Input.GetButtonDown ("Bomb") && actBomb < maxBomb){
	bomb();
	}
}

function reset() {
actBomb = 0;
}

function bomb() {
var x : int;
var z : int;

 x = parseInt(transform.position.x - 0.5);
 z = parseInt(transform.position.z - 0.5);
 if(x < 19) x++;
 if(GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).free) return;
 if(GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).obj.name.Contains("smallwall"))
 {
 	GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).removeObject();
 	actBomb++;
 }
}
