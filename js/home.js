// Function to check if user is logged in
function isLoggedIn() {
  const username = sessionStorage.getItem("username");
  return !!username; // Returns true if username exists, false otherwise
}

// Function to retrieve username from session storage
function getUsername() {
  return sessionStorage.getItem("username");
}

if (isLoggedIn()) {
  console.log("User is logged in");
  const username = getUsername();
  console.log("Username:", username);
} else {
  console.log("User is not logged in");
}

// Initialize Howler.js
var sound = new Howl({
  src: ["music/Driftveil City Pokemon Black White.mp3"], 
});

// Get references to the buttons and slider
var toggleButton = document.getElementById('toggleButton');
var stopButton = document.getElementById('stopButton');
var volumeSlider = document.getElementById('volumeSlider');

// Set default volume
var defaultVolume = 0.1;
sound.volume(defaultVolume);
volumeSlider.value = defaultVolume;

// Variable to keep track of playback state
var isPlaying = false;

// Event listeners for the buttons
toggleButton.addEventListener('click', function() {
  if (isPlaying) {
    sound.pause();
    isPlaying = false;
    toggleButton.textContent = 'Play';
  } else {
    sound.play();
    isPlaying = true;
    toggleButton.textContent = 'Pause';
  }
});

stopButton.addEventListener('click', function() {
  sound.stop();
  isPlaying = false;
  toggleButton.textContent = 'Play';
});

// Event listener for the volume slider
volumeSlider.addEventListener('input', function() {
  var volume = parseFloat(volumeSlider.value);
  sound.volume(volume);
});
