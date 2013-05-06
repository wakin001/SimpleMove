#pragma strict

var impact : AudioClip;
function OnCollisionEnter () {
    audio.PlayOneShot(impact);
}
 
@script RequireComponent(AudioSource)