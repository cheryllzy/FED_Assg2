const apiUrl = "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics";
const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3a291a6ae8msh31397a7b6be58dap1494fajsn60c7a135e826",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let score = 0;
let incorrectAttempts = 0;
const maxIncorrectAttempts = 3;
const songIds = [
  "2396871",
  "2396884",
  "2396873",
  "2396867",
  "2396881",
  "2396863",
  "2396888",
  "2396889",
  "2396895",
];

let correctAnswersMap = {};

function getRandomId(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

async function fetchData() {
  try {
    let song = getRandomId(songIds);
    let dynamicApiUrl = `${apiUrl}/?id=${song}`;
    const response = await fetch(dynamicApiUrl, apiOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    // Check if lyrics and tracking_data exist in the response
    if (result.lyrics && result.lyrics.tracking_data) {
      const lyrics = result.lyrics.lyrics.body.html;

      // Get the correct title from the API response
      const correctTitle = result.lyrics.tracking_data.title;

      // Put the title into the correctAnswers array
      correctAnswers = [correctTitle];

      // Function to remove HTML tags from a string
      function stripHtml(html) {
        let doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
      }

      // Remove HTML tags from the lyrics
      const formattedLyrics = stripHtml(lyrics);

      // Split the lyrics into paragraphs
      const paragraphs = formattedLyrics.split(/\n\s*\n/);

      // Display the first three paragraphs
      const truncatedLyrics = paragraphs.slice(0, 2).join("\n");

      // Remove empty lines
      const finalLyrics = truncatedLyrics.replace(/^\s*[\r\n]/gm, "");

      document.getElementById("chorusLyrics").innerText = finalLyrics;
    } else {
      console.error(
        "Error: 'lyrics' or 'tracking_data' not found in the API response"
      );
    }
  } catch (error) {
    console.error(error);
  }
}

function checkGuess() {
  const userGuess = document.getElementById("guessInput").value.toLowerCase();
  const resultMessage = document.getElementById("resultMessage");
  const submitButton = document.getElementById("submitButton");

  if (
    correctAnswers
      .map((answer) => answer.toLowerCase())
      .includes(userGuess.toLowerCase())
  ) {
    resultMessage.innerText = "Correct! You guessed the song.";
    updateScoreDisplayWithAnimation(10); // Update score with animation

    // Disable the submit button
    submitButton.disabled = true;
  } else {
    incorrectAttempts++;
    resultMessage.innerText = `Incorrect. Attempt ${incorrectAttempts} of ${maxIncorrectAttempts}. Try again!`;

    if (incorrectAttempts >= maxIncorrectAttempts) {
      revealCorrectAnswer();
    }
  }
}
function revealCorrectAnswer() {
  const resultMessage = document.getElementById("resultMessage");
  resultMessage.innerText = `Sorry, you've exceeded the maximum attempts. The correct answer is: ${correctAnswers[0]}. Press Next Question to continue`;
}

function nextQuestion() {
  fetchData();
  document.getElementById("guessInput").value = "";
  document.getElementById("resultMessage").innerText = "";
  incorrectAttempts = 0; // Reset the incorrect attempts for the next question
  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = false;
}

function updatePointsOnServer(points) {
  const username = getUsername(); // Get the username from session storage

  fetch(`https://assignment2-1d63.restdb.io/rest/account?q={"username":"${username}"}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '65a4e6d5da104321e54ba32f'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data array:', data);
    if (data.length > 0) {
      const accountId = data[0]._id; // Get the _id of the account
      const currentPoints = data[0].points || 0; // Get current points or default to 0

      const updatedPoints = parseInt(currentPoints) + points; // Convert to number and calculate updated points


      // Send PUT request to update points for the account
      fetch(`https://assignment2-1d63.restdb.io/rest/account/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '65a4e6d5da104321e54ba32f'
        },
        body: JSON.stringify({
          points: updatedPoints // Update points field
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Points updated successfully:', data);
      })
      .catch(error => {
        console.error('Error updating points:', error);
      });
    } else {
      console.error('Account not found');
    }
  })
  .catch(error => {
    console.error('Error fetching account:', error);
  });
}

function updateScoreDisplay() {
  document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
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
  const username = sessionStorage.getItem('username');
  return !!username; // Returns true if username exists, false otherwise
}


// Function to retrieve username from session storage
function getUsername() {
  return sessionStorage.getItem('username');
}

if (isLoggedIn()) {
  console.log("User is logged in");
  const username = getUsername();
  console.log("Username:", username);
} else {
  console.log("User is not logged in");
}