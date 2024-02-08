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

let score = 0;
let retries = 0;
let attempts = 0;
const maxAttempts = 3;
const submitButton = document.getElementById("submitButton");

function clearFeedback() {
  document.getElementById("feedback").innerText = "";
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

let incorrectAttempts = 0; // Define a global variable to track incorrect attempts

function submitAnswer() {
  const userAnswer = document.getElementById("answer-input").value;
  const correctAnswer =
    document.getElementById("album-box").dataset.correctAnswer;

  attempts++;

  if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    document.getElementById("feedback").innerText = "Correct Answer!";
    playCorrectAnimation();
    updateScoreDisplayWithAnimation(5); // Update score with animation
    submitButton.disabled = true;
    attempts = 0; // Reset attempts on correct answer
    incorrectAttempts = 0; // Reset incorrect attempts on correct answer
  } else {
    incorrectAttempts++; // Increment incorrect attempts
    if (attempts === maxAttempts) {
      document.getElementById("feedback").innerText =
        "Sorry, you've reached the maximum attempts. The correct answer is: " +
        correctAnswer;
        playIncorrectAnimation();
      submitButton.disabled = true;
    } else {
      document.getElementById("feedback").innerText = `Incorrect. Attempt ${incorrectAttempts} of ${maxAttempts}. Try again.`;
    }
  }

  if (attempts === maxAttempts) {
    showCorrectAnswer(); // Call the function to show the correct answer
    fetchData(); // Fetch a new question after showing the correct answer
    incorrectAttempts = 0; // Reset incorrect attempts on moving to the next question
  }
}

function nextQuestion() {
  incorrectAttempts = 0; // Reset incorrect attempts on fetching a new question
  fetchData();
  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = false;
}


function updatePointsOnServer(points) {
  const username = getUsername(); // Get the username from session storage

  fetch(
    `https://assignment2-1d63.restdb.io/rest/account?q={"username":"${username}"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "65a4e6d5da104321e54ba32f",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Data array:", data);
      if (data.length > 0) {
        const accountId = data[0]._id; // Get the _id of the account
        const currentPoints = data[0].points || 0; // Get current points or default to 0

        const updatedPoints = parseInt(currentPoints) + points; // Convert to number and calculate updated points

        // Send PUT request to update points for the account
        fetch(`https://assignment2-1d63.restdb.io/rest/account/${accountId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": "65a4e6d5da104321e54ba32f",
          },
          body: JSON.stringify({
            points: updatedPoints, // Update points field
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Points updated successfully:", data);
          })
          .catch((error) => {
            console.error("Error updating points:", error);
          });
      } else {
        console.error("Account not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching account:", error);
    });
}

function updateScoreDisplayWithAnimation(points) {
  const scoreDisplay = document.getElementById("scoreDisplay");
  score += points;
  scoreDisplay.innerText = `Score: ${score}`;
  scoreDisplay.classList.add("score-animate"); // Add animation class

  // After 2 seconds, remove animation class
  setTimeout(() => {
    scoreDisplay.classList.remove("score-animate");
  }, 1000);

  // Update points on the server
  updatePointsOnServer(points);
}

// Call the fetchData function to fetch and display the lyrics on page load
fetchData();

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



// lottie animation
function playCorrectAnimation() {
  // Create a div element to contain the Lottie animation
  const animationContainer = document.createElement("div");
  animationContainer.id = "correctAnimationContainer";
  animationContainer.style.position = "fixed";
  animationContainer.style.top = "50%";
  animationContainer.style.left = "50%";
  animationContainer.style.transform = "translate(-50%, -50%)";
  animationContainer.style.zIndex = "9999";

  // Append the animation container to the body
  document.body.appendChild(animationContainer);

  // Set the inner HTML of the animation container to the Lottie animation player
  animationContainer.innerHTML =
    '<dotlottie-player src="https://lottie.host/fd893708-4a0a-44e5-9799-e10a55e4aff5/sFo7BUTXsf.json" background="transparent" speed="0.8" style="width: 1000px; height: 1000px;" autoplay></dotlottie-player>';

  // Create a div element for the overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent black color
  overlay.style.zIndex = "9998"; // Place the overlay below the animation container
  overlay.style.transition = "background-color 1s"; // Smooth transition for background color change

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Trigger reflow to ensure transition is applied
  void overlay.offsetWidth;

  // Gradually change the background color to dark
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black color

  // After 2 seconds, remove the overlay and the animation container
  setTimeout(() => {
    // Gradually change the background color back to transparent
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent black color

    // Remove the overlay and the animation container after the transition
    setTimeout(() => {
      overlay.remove();
      animationContainer.remove();
    }, 1000);
  }, 1000); // Wait for 1 second before starting to revert the transition
}

function playIncorrectAnimation() {
  // Create a div element to contain the Lottie animation
  const animationContainer = document.createElement("div");
  animationContainer.id = "incorrectAnimationContainer";
  animationContainer.style.position = "fixed";
  animationContainer.style.top = "50%";
  animationContainer.style.left = "50%";
  animationContainer.style.transform = "translate(-50%, -50%)";
  animationContainer.style.zIndex = "9999";

  // Append the animation container to the body
  document.body.appendChild(animationContainer);

  // Set the inner HTML of the animation container to the Lottie animation player
  animationContainer.innerHTML =
    '<dotlottie-player src="https://lottie.host/653499bf-f010-4969-9892-214dbfd64ff8/uI6A3n5C4I.json" background="transparent" speed="0.6" style="width: 750px; height: 750px;" loop autoplay></dotlottie-player>';

  // Create a div element for the overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent black color
  overlay.style.zIndex = "9998"; // Place the overlay below the animation container
  overlay.style.transition = "background-color 1s"; // Smooth transition for background color change

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Trigger reflow to ensure transition is applied
  void overlay.offsetWidth;

  // Gradually change the background color to dark
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black color

  // After 2 seconds, remove the overlay and the animation container
  setTimeout(() => {
    // Gradually change the background color back to transparent
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent black color

    // Remove the overlay and the animation container after the transition
    setTimeout(() => {
      overlay.remove();
      animationContainer.remove();
    }, 1000);
  }, 1000); // Wait for 1 second before starting to revert the transition
}

// Initialize Howler.js
var sound = new Howl({
  src: ["music/Yoshis Island Athletic Remix Theme  Super Smash Bros Brawl.mp3"], 
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