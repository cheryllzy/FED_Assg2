const apiUrl =
  "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871";

const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7fb57ae6a3msh9b82223ab632535p1a3027jsnd5322b679e1b",
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
