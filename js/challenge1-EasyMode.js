const apiUrl =
  "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396873";

const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9c305a1717msh0bec0b962478cacp1437e2jsndde67c97605c",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let chorusText = "";
let correctAnswers = ["aphrodite"]; // Change the correct answer accordingly

async function fetchData() {
  try {
    const response = await fetch(apiUrl, apiOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const lyrics = result.lyrics.lyrics.body.html;

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
