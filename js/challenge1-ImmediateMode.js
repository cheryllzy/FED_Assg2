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
}

// Call the fetchData function to fetch and display the lyrics on page load
fetchData();
