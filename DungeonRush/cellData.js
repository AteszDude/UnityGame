#pragma strict

public var free = true;
public var obj : GameObject = null;
public var x = 0;
public var z = 0;

function Start () {

}

function Update () {

}

function placeObject(newobj : GameObject) {
if(!free) return;
  obj = newobj;
  free = false;
}

function removeObject() {
if(free) return;
  Destroy(obj);
  free = true;
}
