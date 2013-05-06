#pragma strict

var post1:Transform;
var post2:Transform;

var lineColor:Color = Color.green;

function Start()
{
	// set the visual for the finish line posts.
	var lineRender:LineRenderer = gameObject.AddComponent(LineRenderer);
	lineRender.SetPosition(0, post1.position);
	lineRender.SetPosition(1, post2.position);
	lineRender.material = new Material(Shader.Find("Particles/Additive"));
	lineRender.SetColors(lineColor, lineColor);
}
