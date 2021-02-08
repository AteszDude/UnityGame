#pragma strict

public var crouching : boolean = false;

private var maxCrouch : int = 1;
private var crouchNum : int = 0;
private var timer : Timer;
private var cScale : int = 4;
private var wSpeed : int = 2;

function Start () {
crouching = false;
maxCrouch = 1;
crouchNum = 0;
timer = gameObject.GetComponent(Timer);
cScale = 4;
}

function Update () {
	if(!(GameObject.Find("mapDeco").GetComponent(GameController).State == "Attack"))
			return;
			
if (Input.GetButtonDown ("Crouch")){
	if(!crouching && crouchNum < maxCrouch)
	crouch();
	}

if(timer.timer > 0.9)
	unCrouch();
	}

function reset() {
crouchNum = 0;
if(crouching)
 unCrouch();
}

function crouch() {
gameObject.transform.localScale /= cScale;
gameObject.transform.Translate(Vector3(0, -1 + (1 / cScale), 0));
gameObject.GetComponent(MyThirdPerson).walkSpeed /= wSpeed;
crouching = true;
crouchNum++;
timer.reset();
timer.go();
}

function unCrouch() {
gameObject.transform.Translate(Vector3(0, 1 - (1 / cScale), 0));
gameObject.transform.localScale *= cScale;
gameObject.GetComponent(MyThirdPerson).walkSpeed *= wSpeed;
crouching = false;
timer.reset();
}
