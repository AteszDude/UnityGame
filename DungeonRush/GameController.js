#pragma strict

var State : String = "NameEnter";
var currentPlayer : int = 1;
var P1name : String= "Archie";
var P2name : String = "Bob";
var timer: Timer;
var time1 : float = 0.0;
var time2 : float = 0.0;
var hitSound : AudioClip;


		function OnGUI () {
		// Make a text field that modifies stringToEdit.
		if(State == "NameEnter") {
		P1name = GUI.TextField (Rect (10, 10, 200, 20), P1name, 25);
		P2name = GUI.TextField (Rect (10, 35, 200, 20), P2name, 25);
		if (GUI.Button (new Rect (10,60,30,15), "OK")) {
			print ("Prepare!!!");
			State = "Build";
			timer.reset();
			timer.go();
		}
		}
		else if(State == "Build" || State == "Attack" || State == "Prepare") {
		GUI.Label(Rect(Screen.width / 2,0,40,30), timer.timer.ToString());
		}
		else if(State == "End") {
		  if(time1 < time2) //Player 1 wins
			GUI.Label(Rect(Screen.width / 2, Screen.height/2,140,30), P1name + " wins!");
		  else if(time1 > time2)
			GUI.Label(Rect(Screen.width / 2, Screen.height/2,140,30), P2name + " wins!");
		  else
		  	GUI.Label(Rect(Screen.width / 2, Screen.height/2,140,30), "Draw!");
		  		}
		  		
		//Writing the acting player
		if((State == "Attack" && currentPlayer == 1) || (State == "Build" && currentPlayer == 2))
			GUI.Label(Rect(Screen.width - 130, 5, 130, 30), P1name + "'s turn!");
		else if(State == "Attack" || State == "Build")
			GUI.Label(Rect(Screen.width - 130, 5, 130, 30), P2name + "'s turn!");
		//Game Help
		if(State == "Attack")
		  GUI.Label(Rect(Screen.width - 150, 35, 150, 90), "Move: arrow keys \n Alt: remove 1 block \n Ctrl: minisize");
		else if(State == "Build")
		  GUI.Label(Rect(Screen.width - 150, 35, 150, 90), "Left click: place object \n Right click: remove object");

	}

function Start () {
timer  = GetComponent(Timer);
currentPlayer = 1;
}

function enterName() {
}

function resetMap() {
//Remove all objects on the map
var cells = GetComponent(generateMap).cells;
for(var i = 0; i < 160; i++)
   cells[i].GetComponent(cellData).removeObject();

//Reset the number of weapons
GetComponent(Weapons).reset();

//Reset the guy
GameObject.Find("3rd Person Controller").transform.position = Vector3(0.6, 1.3, 5);
GameObject.Find("3rd Person Controller").GetComponent(Crouch).reset();
GameObject.Find("3rd Person Controller").GetComponent(Bomb).reset();
}

function stageFinished() {
//Triggered when the player reaches the finish line
if(currentPlayer < 2) {
	//Switch to other player
	time1 = timer.timer;
	currentPlayer++;
	resetMap();
	timer.reset();
	timer.go();
	State = "Build";
	}
else { //End the game
State = "End";
time2 = timer.timer;
if(time1 < time2) //Player 1 wins
	Debug.Log(P1name + " has won the game!");
else if(time1 > time2)
	Debug.Log(P2name + " has won the game!");
else Debug.Log("It's a Tie");
}

}

function buildFinished() {
   timer.reset();
   timer.increasing = false;
   timer.timer = 3.1;
   timer.go();
   State = "Prepare";
   
   //Check for reachability
//   GetComponent(CheckReachability).init();
//   if (!GetComponent(CheckReachability).check())
//  resetMap();
}

function startAttack() {
	State = "Attack";
	timer.reset();
	timer.go();
}

//Call this function when the player gets hit
function playerHit() {
timer.timer += 10;
audio.clip = hitSound;
audio.Play();
audio.PlayOneShot(hitSound);
}


function Update () {
switch(State) {
	case "Build":
	  if(timer.timer > 150.0)
		buildFinished();
	  break;
	case "Attack":
	  if(timer.timer > 120.0)
		stageFinished();
	  break;
	case "Prepare":
	  if(timer.timer <= 0)
	     startAttack();
	  break;
	default:
	break;
}
}
