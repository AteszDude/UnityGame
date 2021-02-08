#pragma strict

public var timer : float = 0.0;
var isActive = false;
public var increasing : boolean = true;

function Start() {
increasing = true;
}

function go() {
isActive = true;
}

function stop() {
isActive = false;
}

function reset() {
timer = 0.0;
isActive = false;
increasing = true;
}


function Update () {
if(!isActive) return;
if(increasing) timer += Time.deltaTime;
else timer -= Time.deltaTime;
}
