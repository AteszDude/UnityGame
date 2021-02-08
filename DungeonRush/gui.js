#pragma strict

var menuwidth : int;
var MapDeco : GameObject;

function Start () {
menuwidth = 135;
MapDeco = GameObject.Find("mapDeco");
}

function Update () {

}

function OnGUI () {

	if(MapDeco.GetComponent(GameController).State != "Build")
		return;

    GUI.TextField(Rect(200,5,100,25), "Money: " + MapDeco.GetComponent(Weapons).money + "$");
	GUI.TextField(Rect(200,30,100,25), "Selected: -" +
	  MapDeco.GetComponent(Weapons).getPrice(MapDeco.GetComponent(mouseCont).selected) + "$");    

	if (GUI.Button (Rect (5,10,menuwidth,30), "Create Turret up (" +
	MapDeco.GetComponent(Weapons).getAvailable(0).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceTurret";
			MapDeco.GetComponent(mouseCont).selected = 0;
	}

	if (GUI.Button (Rect (5,42,menuwidth,30), "Create Turret down (" +
	MapDeco.GetComponent(Weapons).getAvailable(1).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceTurret";
			MapDeco.GetComponent(mouseCont).selected = 1;
	}
	
	if (GUI.Button (Rect (5,74,menuwidth,30), "Create Turret left (" +
	MapDeco.GetComponent(Weapons).getAvailable(2).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceTurret";
			MapDeco.GetComponent(mouseCont).selected = 2;
	}
	
	if (GUI.Button (Rect (5,106,menuwidth,30), "Create Turret right (" +
	MapDeco.GetComponent(Weapons).getAvailable(3).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceTurret";
			MapDeco.GetComponent(mouseCont).selected = 3;
	}

	if (GUI.Button (Rect (5,170,menuwidth,30), "Create small Wall (" +
	MapDeco.GetComponent(Weapons).getAvailable(4).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceWall";
			MapDeco.GetComponent(mouseCont).selected = 4;
	}

	if (GUI.Button (Rect (5,202,menuwidth,30), "Create Big Wall (" +
	MapDeco.GetComponent(Weapons).getAvailable(5).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceWall";
			MapDeco.GetComponent(mouseCont).selected = 5;
	}	
	
	if (GUI.Button (Rect (5,234,menuwidth,30), "Create Dummy (" +
	MapDeco.GetComponent(Weapons).getAvailable(6).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceDummy";
			MapDeco.GetComponent(mouseCont).selected = 6;
	}
	
	if (GUI.Button (Rect (5,266,menuwidth,30), "Create Minion (" +
	MapDeco.GetComponent(Weapons).getAvailable(7).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceMinion";
			MapDeco.GetComponent(mouseCont).selected = 7;
	}


	if (GUI.Button (Rect (5,298,menuwidth,30), "Create Laser (" +
	MapDeco.GetComponent(Weapons).getAvailable(8).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceLaser";
			MapDeco.GetComponent(mouseCont).selected = 8;
	}

	if (GUI.Button (Rect (5,362,menuwidth,30), "Create TripleWall (" +
	MapDeco.GetComponent(Weapons).getAvailable(9).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceWall2";
			MapDeco.GetComponent(mouseCont).selected = 9;
	}

	if (GUI.Button (Rect (5,394,menuwidth,30), "Create CrossWall (" +
	MapDeco.GetComponent(Weapons).getAvailable(10).ToString() + ")")) {
			MapDeco.GetComponent(mouseCont).state = "PlaceWall2";
			MapDeco.GetComponent(mouseCont).selected = 10;
	}


	if (GUI.Button (Rect (300,5,90,30), "Ready!")) {
	MapDeco.GetComponent(GameController).buildFinished();
	}
	
}
