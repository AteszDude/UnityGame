//Removed because of 2-dimensional arrays
//#pragma strict

var TurretUp : int = 0;
var TurretDown : int = 1;
var TurretLeft : int = 2;
var TurretRight : int = 3;


var smallWall : int = 4;
var bigWall : int = 5;

var minion : int = 6;
var dummy : int = 7;

var money : int = 1000;
var maxMoney : int = 1200;

var weapons = new Array();

function Start() {

  money = maxMoney;

  weapons[0] = [3 + Random.Range(0, 3), 0, 60, "TurretUp"];
  weapons[1] = [3 + Random.Range(0, 3), 0, 60, "TurretDown"];
  weapons[2] = [1 + Random.Range(0, 1), 0, 60, "TurretLeft"];
  weapons[3] = [1 + Random.Range(0, 1), 0, 60, "TurretRight"];

  weapons[4] = [6 + Random.Range(0, 4), 0, 20, "smallWall"];
  weapons[5] = [6 + Random.Range(0, 3), 0, 15, "bigWall"];

  weapons[6] = [3 + Random.Range(0, 1), 0, 180, "minion"];
  weapons[7] = [3 + Random.Range(0, 1), 0, 140, "dummy"];
  weapons[8] = [3 + Random.Range(0, 1), 0, 200, "laser"];

  weapons[9] = [2 + Random.Range(0, 1), 0, 30, "triplewall"];
  weapons[10] = [2 + Random.Range(0, 1), 0, 80, "crosswall"];

}

function add(num : int) {
if(weapons[num][1] >= 0)
	weapons[num][1] -= 1;
else return false;
return true;
}

function subtract(num : int) {
if(weapons[num][1] < weapons[num][0])
	weapons[num][1] += 1;
else return false;
return true;
}

function getAvailable(num : int) {
return weapons[num][0] - weapons[num][1];
}

function getPrice(num : int) {
return weapons[num][2];
}

function reset () {
for(i = 0; i < 8; i++) {
weapons[i][1] = 0;
}
money = maxMoney;
}
