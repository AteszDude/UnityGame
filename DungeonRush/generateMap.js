#pragma strict

var cell : GameObject;
public var cells : GameObject[];
public var mapx;
public var mapz;

function Start () {
   var mapx : int = 20;
   var mapz : int = 8;

   cells = new GameObject[160];
   var i : int = 0;

    for (var x = 0; x < mapx; x++) {
        for (var z = 0; z < mapz; z++) {
            cells[i] = Instantiate(cell, Vector3 (0.5 + x, 0, 0.5 + z), Quaternion.Euler(270, 0, 0));
            cells[i].name = "cell" + x + "-" + z;
            cells[i].GetComponent(cellData).x = x;
            cells[i].GetComponent(cellData).z = z;
            i++;
        }
    }
}
