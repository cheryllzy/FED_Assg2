// challenge4.js

const questionData = [
  { id: 670828, correctAnswers: [] },
  { id: 123456, correctAnswers: [] },
  { id: 789012, correctAnswers: [] },
  // Add more questions as needed
];

let currentQuestionIndex = 0;

const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f1ee603136msh6f15255da6b84dep197b04jsnf926ab422d30",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let albumName = "";

async function fetchData() {
  const currentQuestion = questionData[currentQuestionIndex];
  const apiUrl = `https://genius-song-lyrics1.p.rapidapi.com/album/details/?id=${currentQuestion.id}`;

  try {
    const response = await fetch(apiUrl, apiOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    // Adjust this part based on the actual response structure
    albumName = result.album.name || "Album name not found";

    // Extract and store correct answers from the API response
    currentQuestion.correctAnswers = result.album.correct_answers || [];

    document.getElementById("albumName").innerText = albumName;
  } catch (error) {
    console.error(error);
  }
}

function checkGuess() {
  const userGuess = document.getElementById("guessInput").value.toLowerCase();
  const currentQuestion = questionData[currentQuestionIndex];
  const lowerCaseCorrectAnswers = currentQuestion.correctAnswers.map((answer) =>
    answer.toLowerCase()
  );
  const resultMessage = document.getElementById("resultMessage");

  if (lowerCaseCorrectAnswers.includes(userGuess)) {
    resultMessage.innerText = "Correct! You guessed the album.";
  } else {
    resultMessage.innerText = "Incorrect. Try again!";
  }
}

function nextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % questionData.length;
  fetchData();
  document.getElementById("guessInput").value = ""; // Clear the input field
  document.getElementById("resultMessage").innerText = ""; // Clear the result message
}

// Call the fetchData function to fetch and display the album name on page load
fetchData();
