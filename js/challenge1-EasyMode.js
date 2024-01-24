// Add API Link and Key
const url =
  "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f1ee603136msh6f15255da6b84dep197b04jsnf926ab422d30",
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
  const lyricsBox = document.getElementById("lyrics-box");
  const correctAnswer = lyricsBox.dataset.correctAnswer;

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

    const lyricsBox = document.getElementById("lyrics-box");

    // Extract lyrics body from the response
    const lyricsBody =
      result.lyrics?.body?.html || result.lyrics?.html || result.lyrics;

    if (lyricsBody) {
      // Extract the first 500 characters of the lyrics
      const first500Characters = lyricsBody.substring(0, 500);

      // Extract song title or other relevant information from the response if needed
      const songTitle = result.tracking_data?.title || "Sample Song Title";

      console.log("Song Title:", songTitle);

      lyricsBox.innerHTML = "Lyrics:<br>" + first500Characters;
      document.getElementById("answer-input").value = ""; // Clear the previous user input
      document.getElementById("answer-input").placeholder =
        "Enter the song's title";
      lyricsBox.dataset.correctAnswer = songTitle;

      clearFeedback();
      attempts = 0; // Reset the attempts when fetching a new question
    } else {
      throw new Error("Invalid lyrics structure in the response.");
    }
  } catch (error) {
    console.error(error);
  }
}

function submitAnswer() {
  const userAnswer = document.getElementById("answer-input").value;
  const correctAnswer =
    document.getElementById("lyrics-box").dataset.correctAnswer;

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
