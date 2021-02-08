#pragma strict

public var x : int = 0;
public var z : int = 0;

// this script pushes all rigidbodies that the character touches
//var pushPower = 2.0;
// 
//function OnTriggerEnter(other : Collider) {
//	if(other.name == "3rd Person Controller") {
//    var body : Rigidbody = this.GetComponent(Rigidbody).body;
// 
//    // We dont want to push objects below us
//    if (hit.moveDirection.y < -0.3) { return; }
// 
//    // Calculate push direction from move direction,
//    // we only push objects to the sides never up and down
//    var pushDir = Vector3 (hit.moveDirection.x, 0, hit.moveDirection.z);
// 
//    // If you know how fast your character is trying to move,
//    // then you can also multiply the push velocity by that.
// 
//    // Apply the push
//    body.velocity = pushDir * pushPower;
//}
//}
