#pragma strict

var speed:float = 3.0f;
var rotateSpeed:float = 10.0f;

function Update () 
{
	// Detect mousse left clicks.
	// A parameter of “0″ signifies a left-click, “1″ a right-click and “2″ a middle-click when 
	// used with the GetMouseButtonDown function.
	if (Input.GetMouseButtonDown(0))
	{
		// Check if the game object is clicked by casting a ray from the main camera to the touched position.
		var ray:Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hit:RaycastHit;
		// Cast a ray of distance 100, and check if this collider is hit.
		if (collider.Raycast(ray, hit, 100.0))
		{
			// Log a debug message.
			Debug.Log("Moving the target");
			// Move the target forward
			// Vector3.forward is the same as Vector3(0,0,1) and a speed multiplier of 3 will move the Cube by Vector3(0,0,3).
			transform.Translate(Vector3.forward * speed);
			// Rotate the target along the y-axis.
			// Vector3.up == Vector(0,1,0)
			transform.Rotate(Vector3.up * rotateSpeed);
		}
		else
		{
			// Clear the debug message.
			Debug.Log("");
		}
	}
}