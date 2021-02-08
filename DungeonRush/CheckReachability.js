//#pragma strict Disabled because of BCE0048

var map;//C = check, F = free, X = reserved
var nextlist;

function Start() {
nextlist = new Array();
map = new Array(20);
}

function init(){
for(var i = 0; i < 20; i++)
	map[i] = new Array(8);

    for (var x = 0; x < 20; x++) {
        for (var z = 0; z < 8; z++) {
        if(GameObject.Find("cell" + x + "-" + z).GetComponent(cellData).free)
        	map[x][z] = "F";
        else map[x][z] = "X";
		}}
}

function check() {

	nextlist.Add([0, 4]);
	var i : int = 0;

   while(nextlist.length > 0)
   {
   	if(step(nextlist[0]))
   		return true;
   	   nextlist.RemoveAt(i);
   	   i++;
   }
   return false;
}

function step(cell : int[]) {
	x = cell[0];
	z = cell[1];

	if(x == 19) return true;
	
	map[x][z] = "X";
	if(x > 0 &&  map[x - 1][z] == "F")
		nextlist.Add([x - 1, z]);
	if(map[x + 1][z] == "F")
		nextlist.Add([x + 1, z]);

	if(z < 7 && map[x][z + 1] == "F")
		nextlist.Add([x, z + 1]);
	if(z > 0 && map[x][z - 1] == "F")
		nextlist.Add([x, z - 1]);
}

