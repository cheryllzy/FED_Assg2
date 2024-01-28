const apiUrl =
  "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871";

const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0f6d60137amsh81fa88f84819e24p14880ejsn839d7e746f66",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let chorusText = "";
let correctAnswers = ["faded"];

async function fetchData() {
  try {
    const response = await fetch(apiUrl, apiOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const lyrics = result.lyrics.lyrics.body.html;

    const tempElement = document.createElement("div");
    tempElement.innerHTML = lyrics;

    const chorusElement = tempElement.querySelector('[data-id="8803037"]');
    chorusText = chorusElement ? chorusElement.innerText : "Chorus not found";

    document.getElementById("chorusLyrics").innerText = chorusText;
  } catch (error) {
    console.error(error);
  }
}

function checkGuess() {
  const userGuess = document.getElementById("guessInput").value.toLowerCase();
  const resultMessage = document.getElementById("resultMessage");

  if (correctAnswers.includes(userGuess)) {
    resultMessage.innerText = "Correct! You guessed the song.";
    score += 15; // Update the score by 15 points for a correct answer
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

// Call the fetchData function to fetch and display the lyrics on page load
fetchData();

// use arrow button to go back to home page
function goBack() {
  window.history.back();
}
