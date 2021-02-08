#pragma strict

var projectile : GameObject;
private var rotation : int = 100;
var timer : float = 0.0;
var timerMax : float = 1;
public var x = 4;
public var z = 4;

function Start () {

timer = 0;
timerMax = 0.1;
rotation = 100;

}

function Update () {
	if(!(GameObject.Find("mapDeco").GetComponent(GameController).State == "Attack"))
			return;


gameObject.transform.Rotate(Vector3(0, 0, Time.deltaTime * rotation));

	timer += Time.deltaTime;
 
    if (timer > timerMax) {
		// reset timer
		timer = 0.0;
		var proj : GameObject = Instantiate(projectile, Vector3(0.5 + x, 0.2, 0.5 + z), Quaternion.identity);
		proj.name = "Projectile";
		proj.GetComponent(projCont).owner = gameObject;
		proj.transform.rotation = gameObject.transform.rotation;
		proj.GetComponent(Rigidbody).velocity = Quaternion.Euler(gameObject.transform.eulerAngles.x,
		gameObject.transform.eulerAngles.y, gameObject.transform.eulerAngles.z) * Vector3(-8, 0, 0);			

	}

}

