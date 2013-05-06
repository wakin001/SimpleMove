#pragma strict

static var gameRunning : boolean = false;
 
var gameTimeAllowed : float = 20.0;
var gameMessageFont:Font;
var intro:Transform;
var gameObjectsToReset:GameObject[];
var fanReactionScript:FanReaction;

private var playButtonText = "Play"; 
private var gameMessageLabel = "";
private var gameMessageDisplay : Rect;
private var timedOut : boolean = false;
private var gameTimeRemaining : float = gameTimeAllowed;

private var missionCompleted : boolean = false;
private var missionCompleteTime : float = gameTimeAllowed;
 
function Awake() {
    gameMessageDisplay = Rect(10, 10, Screen.width - 20, 40);
}
 
// OnGUI() is called when an event occurs such as a mouse click, or at least once a frame.
function OnGUI() { 
	GUI.skin.font = gameMessageFont;
    GUI.color = Color.yellow;
    GUI.backgroundColor = Color.black;
 
    var text : String = ""; 
    if (missionCompleted) {
        text = String.Format( "{0:00}:{1:00}", parseInt( gameTimeRemaining / 60.0 ), parseInt( gameTimeRemaining % 60.0 ) );
        gameMessageLabel = "Mission completed in: " + text;
        
    } else if (timedOut){
        gameMessageLabel = "Time's up!!";
    }
    else
    {
    	text = String.Format( "{0:00}:{1:00}", parseInt( gameTimeRemaining / 60.0 ), parseInt( gameTimeRemaining % 60.0 ) );
        gameMessageLabel = "Time left: " + text;
    }
    //GUI.Box() creates a Box Control using the dimensions you set up initially and with the current game message, 
    // which consists of the countdown time info, a success message or a failure message.
    GUI.Box(gameMessageDisplay, gameMessageLabel);  
    
    // The menu button.
    if (!gameRunning)
    {
    	var xPos = Screen.width / 2 - 100;
    	var yPos = Screen.height / 2 + 100;
    	if (GUI.Button(new Rect(xPos, yPos, 200, 50), playButtonText)) 
    	{
    		startGame(); 
    	}
    }
}
 
function Update() { 
    if (!gameRunning)
        return; 
 
    // Keep track of time and display a countdown
    // Time.deltaTime is the time in seconds that the last frame took to complete.
    // Keep in mind that the frame rate may vary and so this value may also vary.
    gameTimeRemaining -= Time.deltaTime;
    if (gameTimeRemaining <= 0) {
        timedOut = true; 
        gameRunning = false;
        
        // play the sound of defeat
        fanReactionScript.playSoundOfVictory(false);
    }
}

function MissionComplete()
{
	if (!gameRunning)
	{
		return;
	}
	
	missionCompleted = true;
	gameRunning = false;
	
	// play the sound of defeat
    fanReactionScript.playSoundOfVictory(true);
	
	missionCompleteTime = gameTimeAllowed - gameTimeRemaining;
}

function startGame()
{
	// Reset if starting a new game.
	gameTimeRemaining = gameTimeAllowed;
	timedOut = false;
	missionCompleted = false;
	
	// Change button text after the initial run.
	playButtonText = "Play Again";
	
	// turn off the intro text.
	for (var child:Transform in intro)
	{
		child.gameObject.renderer.enabled = false;
	}
	
	// Clean out any enenmy objects.
	var enemies = GameObject.FindGameObjectsWithTag("Enemy");
	for (var enemy:GameObject in enemies)
	{
		Destroy(enemy);
	}
	// Call all game reset methods.
	for (var gameObjectReceiver:GameObject in gameObjectsToReset)
	{
		gameObjectReceiver.SendMessage("resetGame", null, SendMessageOptions.DontRequireReceiver);
	}
	
	
	// Kick off the game.
	gameRunning = true;
}