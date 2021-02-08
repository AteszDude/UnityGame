#pragma strict
#pragma strict

var projectile : GameObject;
	
var timer : float = 0.0;
var timerMax : float = 1;
public var x = 0;
public var z = 0;
var direction : String = "right";
var directionV : Vector3 = Vector3(0, 0 , 0);

function Start () {	
	timer = 0.0 + Random.Range(0.0, 1.0);
	timerMax = 1;
	
	//Rotate object
	if(direction == "up")
	   directionV = Vector3(0, 0, 90);
	else if(direction == "right")
	   directionV = Vector3(0, 0, 180);
	else if(direction == "down")
	   directionV = Vector3(0, 0, 270);

	this.transform.Rotate(directionV);
}

function Update () {
	if(!(GameObject.Find("mapDeco").GetComponent(GameController).State == "Attack"))
			return;

	timer += Time.deltaTime;
 
    if (timer > timerMax) {
		// reset timer
		timer = 0.0;
		var proj : GameObject = Instantiate(projectile, Vector3(0.5 + x, 1, 0.5 + z), Quaternion.identity);
		proj.name = "Projectile";
		proj.GetComponent(projCont).owner = gameObject;
		
		switch(direction) {
			case "up":
				proj.GetComponent(Rigidbody).velocity = Vector3(0, 0, 3);			
				break;
			case "left":
				proj.GetComponent(Rigidbody).velocity = Vector3(-3, 0, 0);
				break;
			case "down":
				proj.GetComponent(Rigidbody).velocity = Vector3(0, 0, -3);
				break;

			default:
				proj.GetComponent(Rigidbody).velocity = Vector3(3, 0, 0);
				break;
		}
	}
}
