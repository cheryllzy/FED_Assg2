const apiUrl = "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics";

const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0f6d60137amsh81fa88f84819e24p14880ejsn839d7e746f66",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let chorusText = "";
let correctAnswers = []; // Change the correct answer accordingly
let score = 0; // Initialize the score variable
const songIds = ["2396873", "131312312", "342432432", "24234234"];

async function fetchData() {
  try {
    let song = getRandomId(songIds);
    apiUrl = apiUrl + "/?id=" + song;
    const response = await fetch(apiUrl, apiOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    const lyrics = result.lyrics.lyrics.body.html;

    //put the title into the correctAnswers array

    // Remove the <p> tags and replace <br> with line breaks
    const formattedLyrics = lyrics
      .replace(/<\/?p>/g, "")
      .replace(/<br>/g, "\n");

    // Get the first 568 characters
    const truncatedLyrics = formattedLyrics.substring(0, 568);

    // Remove empty lines
    const finalLyrics = truncatedLyrics.replace(/^\s*[\r\n]/gm, "");

    document.getElementById("chorusLyrics").innerText = finalLyrics;
  } catch (error) {
    console.error(error);
  }
}

function checkGuess() {
  const userGuess = document.getElementById("guessInput").value.toLowerCase();
  const resultMessage = document.getElementById("resultMessage");

  if (correctAnswers.includes(userGuess)) {
    resultMessage.innerText = "Correct! You guessed the song.";
    score += 5; // Update the score by 5 points for a correct answer
    updateScoreDisplay(); // Update the score display
  } else {
    resultMessage.innerText = "Incorrect. Try again!";
  }
}

function nextQuestion() {
  fetchData();
  document.getElementById("guessInput").value = ""; // Clear the input field
  document.getElementById("resultMessage").innerText = ""; // Clear the result message
}

function updateScoreDisplay() {
  document.getElementById("scoreDisplay").innerText = "Score: " + score; // Update the score display
}

// Call the fetchData function to fetch and display the lyrics on page load
fetchData();
