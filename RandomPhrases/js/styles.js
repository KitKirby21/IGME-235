let phrases =
    ["Reality bends to my will",
     "Time for the reckoning!",
     "Pass Into The Iris",
     "Let's Drop The Beat!",
     "Show Them Your Power",
     "Let the Kitsune guide you!",
     "Turning Of The Lights",
     "Heroes Never Die",
     "Freeze! Don't Move!",
     "Fire At Will",
     "Cease your resistance",
     "Hammer Down!",
     "Surrender to my Will!",
     "Molten Core!",
     "This ends now!",
     "No one can hide from my sight",
     "All To Me",
     "Bombs away",
     "Light 'em up!",
     "Ryuugekiken",
     "Ryuu-ga, Wa-ga-te-ki-wo, Ku-ra-u",
     "Eat This!",
     "ROARRRRR",
     "Area Denied",
     "Meteor Strike!",
     "It's High Noon",
     "Go Get Him, Bob!",
     "I've Got You In My Sights!",
     "DIE, DIE, DIE!",
     "Justice Rains From Above!",
     "Fire In The Hole!",
     "Du do do doooo do DUUUU",
     "Het universum zingt voor mij",
     "Nerf This!",
     "Adaptive circuits engaged"]

window.addEventListener("load", generateRandomPhrase);

function generateRandomPhrase() {
    let randomIndex = Math.floor(Math.random() * (phrases.length - 1));
    document.querySelector("#phrase p").innerHTML = phrases[randomIndex];
}