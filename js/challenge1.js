const apiUrl =
  "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871";

const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a4123a0c9emshae37437481acf31p116ab5jsn6065e0210c9f",
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


// use arrow button to go back to home page
function goBack() {
  window.history.back();
}
