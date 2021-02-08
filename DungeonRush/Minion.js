#pragma strict

public var x = 0;
public var z = 0;
var direction : String = "right";
var directionV : Vector3 = Vector3(0, 0 , 0);

function Start () {
  this.GetComponent(Rigidbody).velocity = Vector3(1, 0, 0);

}

function Update () {

    if(this.transform.position.x < 0)direction = "right";
	else if(this.transform.position.x > 19)direction = "left";
	else if(this.transform.position.z > 7.5)direction = "down";
	else if(this.transform.position.z < 0.5)direction = "up";



	if(!(GameObject.Find("mapDeco").GetComponent(GameController).State == "Attack"))
	  this.GetComponent(Rigidbody).velocity = Vector3(0, 0, 0);
	else if(direction == "right")
	  this.GetComponent(Rigidbody).velocity = Vector3(2, 0, 0);
	else if(direction == "up")
	  this.GetComponent(Rigidbody).velocity = Vector3(0, 0, 2);
	else if(direction == "left")
	  this.GetComponent(Rigidbody).velocity = Vector3(-2, 0, 0);
	else 
	  this.GetComponent(Rigidbody).velocity = Vector3(0, 0, -2);

}

function updateVector() {
switch(direction) {
	case "right":
	  directionV = Vector3(0, 0, 0);
	  break;
	case "up":
	  directionV = Vector3(0, 0, 90);
	  break;
	case "left":
	  directionV = Vector3(0, 0, 180);	
	  break;
	case "down":
	  directionV = Vector3(0, 0, 270);
	  break;
	default:
	break;
}

  //transform.rotation = Quaternion.Euler(directionV);
}

function changeDirection() {

   var newDir : String = direction;
   
   while(newDir == direction)
   switch(Random.Range(0, 4)) {
   case 0:
     newDir = "right";
     break;
   case 1:
     newDir = "up";
     break;
   case 2:
     newDir = "left";
     break;
   case 3:
     newDir = "down";
     break;
   default:
   break;
   }
  direction = newDir;
  updateVector();
  
}

function OnTriggerEnter(other : Collider) {
	if(other.name == "3rd Person Controller") {
    GameObject.Find("3rd Person Controller").transform.position = Vector3(0.6, 1.3, 5);
	}
	else changeDirection();
	
}
