#pragma strict

var audioVictory:AudioClip;
var audioDefeat:AudioClip;
var volumeVictory:float = 2.0;
var volumeDefeat:float = 2.0;

function playSoundOfVictory(isVictory:boolean)
{
	// stop any current audio
	if (audio.isPlaying)
	{
		audio.Stop();
	}
	
	// Play either the sound of victory or defeat.
    audio.clip = isVictory ? audioVictory : audioDefeat;
    audio.volume = isVictory ? volumeVictory : volumeDefeat;
    audio.Play();
}

function resetGame()
{
	// Reset to original state, stop any audio
	if (audio.isPlaying)
	{
		audio.Stop();
	}
}

@script RequireComponent(AudioSource)