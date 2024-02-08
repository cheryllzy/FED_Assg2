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