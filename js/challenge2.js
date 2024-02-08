// Add API Link and Key
const url =
  "https://genius.p.rapidapi.com/chart/albums?time_period=month&per_page=50&page=1";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c36a5f7059msh471e300fa89b3efp14514fjsn254ee1cf9c71",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let retries = 0;
let attempts = 0;
const maxAttempts = 3;

function clearFeedback() {
  document.getElementById("feedback").innerText = "";
}

function showCorrectAnswer() {
  const albumBox = document.getElementById("album-box");
  const correctAnswer = albumBox.dataset.correctAnswer;

  alert("The correct answer is: " + correctAnswer);
}

async function fetchData() {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 429 && retries < 3) {
        const delay = Math.pow(2, retries) * 1000;
        console.log(
          `Rate limited (Retry ${retries + 1}/3). Retrying in ${
            delay / 1000
          } seconds...`
        );
        retries++;
        await new Promise((resolve) => setTimeout(resolve, delay));
        console.log("Retrying fetch...");
        return fetchData();
      } else {
        throw new Error("Failed to fetch data.");
      }
    }

    const result = await response.json();
    console.log("API Response:", result);

    const chartItems = result.chart_items;

    if (!chartItems || chartItems.length === 0) {
      throw new Error("Invalid response or no albums found.");
    }

    console.log("Sample Album Object:", chartItems[0].item);

    const albumBox = document.getElementById("album-box");
    const randomAlbum =
      chartItems[Math.floor(Math.random() * chartItems.length)].item;

    // Ensure the 'name' and 'artist' properties exist before attempting to access them
    const albumName = randomAlbum.name || "N/A";
    const artistName = randomAlbum.artist ? randomAlbum.artist.name : "N/A";

    console.log("Random Album:", { name: albumName, artist: artistName });

    albumBox.innerText = "Album Name: " + albumName;
    document.getElementById("answer-input").value = ""; // Clear the previous user input
    document.getElementById("answer-input").placeholder =
      "Enter the artist's name";
    albumBox.dataset.correctAnswer = artistName;

    clearFeedback();
    attempts = 0; // Reset the attempts when fetching a new question
  } catch (error) {
    console.error(error);
  }
}

function submitAnswer() {
  const userAnswer = document.getElementById("answer-input").value;
  const correctAnswer =
    document.getElementById("album-box").dataset.correctAnswer;

  attempts++;

  if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    document.getElementById("feedback").innerText = "Correct Answer!";
    attempts = 0; // Reset attempts on correct answer
  } else {
    if (attempts === maxAttempts) {
      document.getElementById("feedback").innerText =
        "Sorry, you've reached the maximum attempts. The correct answer is: " +
        correctAnswer;
    } else {
      document.getElementById("feedback").innerText =
        "Incorrect Answer. Try again.";
    }
  }

  if (attempts === maxAttempts) {
    showCorrectAnswer(); // Call the function to show the correct answer
    fetchData(); // Fetch a new question after showing the correct answer
  }
}

function nextQuestion() {
  if (confirm("Do you really want to move to the next question?")) {
    fetchData();
  }
  // You can add other conditions or remove the check based on your requirements
}

// Initial fetch
fetchData();

// use arrow button to go back to home page
function goBack() {
  window.history.back();
}

// Initialize Howler.js
var sound = new Howl({
  src: ["/music/Winning Results  Mario Kart 64 OST.mp3"], // Provide the path to your audio file
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