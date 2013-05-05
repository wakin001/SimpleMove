#pragma strict

var speed:float = 3.0f;
var rotateSpeed:float = 3.0f;

var moveJoystick:Joystick;
var rotateJoystick:Joystick;

function Update () 
{
	// gets a handle to the Character Controller component
	var controller:CharacterController = GetComponent(CharacterController);
	
	// Rotate around y-axis.
	// The Input.GetAxis() value ranges from -1 to +1. A negative value will result in an anti-clockwise 
	// rotation and a positive value a clockwise rotation around the y-axis.
	var rotatePos = Input.GetAxis("Horizontal") ? Input.GetAxis("Horizontal") : joyStickInput(rotateJoystick);
	transform.Rotate(0, rotatePos * rotateSpeed, 0);
//	transform.Rotate(0, Input.GetAxis("Horizontal") * rotateSpeed, 0);
	
	// Move forward/ backward.
	var forward:Vector3 = transform.TransformDirection(Vector3.forward);
	var movePos = Input.GetAxis("Vertical") ? Input.GetAxis("Vertical") : joyStickInput(moveJoystick);
	var curSpeed:float = speed * movePos;
	controller.SimpleMove(forward * curSpeed);
}

function joyStickInput(joystick:Joystick)
{
	var absJoyPos = Vector2(Mathf.Abs(joystick.position.x),
							Mathf.Abs(joystick.position.y));
	var xDirection = (joystick.position.x > 0) ? 1 : -1;
	var yDirection = (joystick.position.y > 0) ? 1 : -1;
	return ((absJoyPos.x > absJoyPos.y) ? absJoyPos.x * xDirection : absJoyPos.y * yDirection);
}

// The last line in the script specifies that this script can only be attached to a 
// GameObject that has a Character Controller component.
@script RequireComponent(CharacterController)