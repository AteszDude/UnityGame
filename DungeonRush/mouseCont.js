#pragma strict

var turret : GameObject;
var smallWall : GameObject;
var bigWall : GameObject;
var minion : GameObject;
var dummy : GameObject;
var laser : GameObject;

var hitInfo : RaycastHit;
var hit;

var act : GameObject;
var state : String;
var selected : int = 0;

var weapons : Weapons;

function Start () {
weapons = GetComponent(Weapons);
}

function checkFree(x : int, z : int) {
//Checks whether the cell at (x, z) has an object
var cell : GameObject;
	cell = GameObject.Find("cell" + x + "-" + z);
	if(cell == null) return false;
return GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).free;
}


function placeObject(act : GameObject, x : int, z : int) {
//Currently works for walls only
    act.name = act.name.ToLower() + x + "-" + z;
	act.GetComponent(WallCont).x = x;
	act.GetComponent(WallCont).z = z;
	var obj : GameObject;
	obj = GameObject.Find("cell" + x + "-" + z);
	obj.GetComponent(cellData).placeObject(act);
}

function Update () {
		if(!(GameObject.Find("mapDeco").GetComponent(GameController).State == "Build"))
			return;

		if(Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1)) {
			//Debug.Log("Turret created.");
			hitInfo = new RaycastHit();
       		hit = Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), hitInfo);
       			
       		if (!hit) return;

       		var obj : GameObject = hitInfo.transform.gameObject;
       		
       		
		    Debug.Log("Hit " + obj.name);
		        if (obj.name.Contains("cell")) {
		        var x = obj.GetComponent(cellData).x;
		        var z = obj.GetComponent(cellData).z;
		        
		        	if(Input.GetMouseButtonDown(1)) {
		        	//Remove object
//		        	obj.GetComponent(cellData).removeObject();
//		        	if(state == "PlaceTurret")
//		        	   GetComponent(Weapons).add(0);
//		        	else if(state == "PlaceWall")
//		        	   GetComponent(Weapons).add(4);
		        	}
		        	else {
		        	//Creating new turret/wall at the selected cell
		        	if(!obj.GetComponent(cellData).free) return; //Return of the cell is reserved, otherwise create a new object
		        	if(GetComponent(Weapons).money < GetComponent(Weapons).getPrice(selected) ||
		        	GetComponent(Weapons).getAvailable(selected) <= 0) return;
		        	
		        	GetComponent(Weapons).money -= GetComponent(Weapons).getPrice(selected);
		        	GetComponent(Weapons).subtract(selected);
		        	
		        	switch(state) {
		      			
		      			case "PlaceTurret":
				      		Debug.Log ("Creating turret at " + x + ", " + z);
							act = Instantiate(turret, Vector3(0.5 + x, 0, 0.5 + z), Quaternion.Euler(270, 0, 0));
							act.name = "turret" + x + "-" + z;
							act.GetComponent(turretCont).x = x;
							act.GetComponent(turretCont).z = z;
							if(selected == 0) act.GetComponent(turretCont).direction = "up";
							else if(selected == 1) act.GetComponent(turretCont).direction = "down";
							else if(selected == 2) act.GetComponent(turretCont).direction = "left";
							else act.GetComponent(turretCont).direction = "right";
							obj.GetComponent(cellData).placeObject(act);
							break;
						case "PlaceWall":
							Debug.Log ("Creating Wall at " + x + ", " + z);
							if(selected == 4) {
							  act = Instantiate(smallWall, Vector3(0.5 + x, 0.5, 0.5 + z), Quaternion.Euler(0, 0, 0));
							  act.name = "smallwall" + x + "-" + z;
							  }
							else {
							  act = Instantiate(bigWall, Vector3(0.5 + x, 0, 0.5 + z), Quaternion.Euler(-90, 0, 0));
							  act.name = "bigwall" + x + "-" + z;
							}
							act.GetComponent(WallCont).x = x;
							act.GetComponent(WallCont).z = z;
							obj.GetComponent(cellData).placeObject(act);
							break;
						case "PlaceDummy":
						  act = Instantiate(dummy, Vector3(0.5 + x, 0, 0.5 + z), Quaternion.Euler(0, 0, 0));
						  act.name = "dummy" + x + "-" + z;
						  act.GetComponent(Dummy).x = x;
						  act.GetComponent(Dummy).z = z;
						  obj.GetComponent(cellData).placeObject(act);
						  break;
						case "PlaceMinion":
						  act = Instantiate(minion, Vector3(0.5 + x, 1, 0.5 + z), Quaternion.Euler(0, 0, 0));
						  act.name = "minion" + x + "-" + z;
						  act.GetComponent(Minion).x = x;
						  act.GetComponent(Minion).z = z;
						  obj.GetComponent(cellData).placeObject(act);
						  break;
						case "PlaceLaser":
						  act = Instantiate(laser, Vector3(0.5 + x, 0.24, 0.5 + z), Quaternion.Euler(-90, 0, 0));
						  act.name = "laser" + x + "-" + z;
						  act.GetComponent(LaserCont).x = x;
						  act.GetComponent(LaserCont).z = z;
						  obj.GetComponent(cellData).placeObject(act);
						  break;
						case "PlaceWall2"://Need to check for neighbouring areas
						if(!(checkFree(x + 1, z) && checkFree(x - 1, z) ))
							return;
						if(selected == 10 && !(checkFree(x, z + 1) && checkFree(x, z - 1) ))
							return;
						  break;
						
						default:
		      				Debug.Log ("Something went wrong!");
		      				break;
		      			
		      		}
		        	
		        	
				}
			}
			else if(obj.name.Contains("turret")) {
			x = obj.GetComponent(turretCont).x;
			z = obj.GetComponent(turretCont).z;
			
			if(Input.GetMouseButtonDown(1)) {
			if(obj.GetComponent(turretCont).direction == "right")
				weapons.add(3);
			else if(obj.GetComponent(turretCont).direction == "left")
				weapons.add(2);				
			else if(obj.GetComponent(turretCont).direction == "down")
				weapons.add(1);
			else if(obj.GetComponent(turretCont).direction == "up")
				weapons.add(0);
			else Debug.Log("Ooops");
											
			GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).removeObject();
			GetComponent(Weapons).money += GetComponent(Weapons).getPrice(0);
				}
			}
			
			else if(obj.name.Contains("wall")) {
			
			 if(!Input.GetMouseButtonDown(1)) return;
			x = obj.GetComponent(WallCont).x;
			z = obj.GetComponent(WallCont).z;
			if(obj.name.Contains("small")) {
				GetComponent(Weapons).money += GetComponent(Weapons).getPrice(4);
				weapons.add(4);}
			else {
				GetComponent(Weapons).money += GetComponent(Weapons).getPrice(5);
				weapons.add(5);}
			GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).removeObject();

			}
			
			else if(obj.name.Contains("dummy")) {
			x = obj.GetComponent(Dummy).x;
			z = obj.GetComponent(Dummy).z;
			
			if(Input.GetMouseButtonDown(1)) {
			GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).removeObject();
			weapons.money += weapons.getPrice(7);
			weapons.add(7);
				}

			}
			
			else if(obj.name.Contains("minion")) {
			x = obj.GetComponent(Minion).x;
			z = obj.GetComponent(Minion).z;
			
			if(Input.GetMouseButtonDown(1)) {
			GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).removeObject();
			GetComponent(Weapons).money += GetComponent(Weapons).getPrice(6);
			weapons.add(6);
				}
			}
			
			else if(obj.name.Contains("laser")) {
			x = obj.GetComponent(LaserCont).x;
			z = obj.GetComponent(LaserCont).z;
			
			if(Input.GetMouseButtonDown(1)) {
			GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).removeObject();
			GetComponent(Weapons).money += GetComponent(Weapons).getPrice(8);
			weapons.add(8);
				}
			}		
			
		}// GetMouseButtonDown
}// Update
