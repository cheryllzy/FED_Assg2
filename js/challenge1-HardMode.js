const apiUrl = "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics";
const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c36a5f7059msh471e300fa89b3efp14514fjsn254ee1cf9c71",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let score = 0;
let incorrectAttempts = 0;
const maxIncorrectAttempts = 3;
const songIds = [
  "9837231",
  "84851",
  "8921500",
  "9363022",
  "566",
  "9393794",
  "9610509",
  "109177",
  "7260084",
  "5454249",
  "8928740",
  "551256",
  "3041363",
  "6533253",
  "2949128",
  "8062834",
  "378195",
  "7122516",
  "8581590",
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
      const truncatedLyrics = paragraphs.slice(0, 1).join("\n");

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
    playCorrectAnimation(); // Play Lottie animation
    updateScoreDisplayWithAnimation(15); // Update score with animation

    // Disable the submit button
    submitButton.disabled = true;
  } else {
    incorrectAttempts++;
    resultMessage.innerText = `Incorrect. Attempt ${incorrectAttempts} of ${maxIncorrectAttempts}. Try again!`;

    if (incorrectAttempts >= maxIncorrectAttempts) {
      revealCorrectAnswer();
      submitButton.disabled = true;
    }
  }
}
function revealCorrectAnswer() {
  const resultMessage = document.getElementById("resultMessage");
  resultMessage.innerText = `Sorry, you've exceeded the maximum attempts. The correct answer is: ${correctAnswers[0]}. Press Next Question to continue`;
  playIncorrectAnimation();
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

// lottie animation
function playCorrectAnimation() {
  // Create a div element to contain the Lottie animation
  const animationContainer = document.createElement("div");
  animationContainer.id = "correctAnimationContainer";
  animationContainer.style.position = "fixed";
  animationContainer.style.top = "50%";
  animationContainer.style.left = "50%";
  animationContainer.style.transform = "translate(-50%, -50%)";
  animationContainer.style.zIndex = "9999";

  // Append the animation container to the body
  document.body.appendChild(animationContainer);

  // Set the inner HTML of the animation container to the Lottie animation player
  animationContainer.innerHTML =
    '<dotlottie-player src="https://lottie.host/fd893708-4a0a-44e5-9799-e10a55e4aff5/sFo7BUTXsf.json" background="transparent" speed="0.8" style="width: 1000px; height: 1000px;" autoplay></dotlottie-player>';

  // Create a div element for the overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent black color
  overlay.style.zIndex = "9998"; // Place the overlay below the animation container
  overlay.style.transition = "background-color 1s"; // Smooth transition for background color change

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Trigger reflow to ensure transition is applied
  void overlay.offsetWidth;

  // Gradually change the background color to dark
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black color

  // After 2 seconds, remove the overlay and the animation container
  setTimeout(() => {
    // Gradually change the background color back to transparent
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent black color

    // Remove the overlay and the animation container after the transition
    setTimeout(() => {
      overlay.remove();
      animationContainer.remove();
    }, 1000);
  }, 1000); // Wait for 1 second before starting to revert the transition
}

function playIncorrectAnimation() {
  // Create a div element to contain the Lottie animation
  const animationContainer = document.createElement("div");
  animationContainer.id = "incorrectAnimationContainer";
  animationContainer.style.position = "fixed";
  animationContainer.style.top = "50%";
  animationContainer.style.left = "50%";
  animationContainer.style.transform = "translate(-50%, -50%)";
  animationContainer.style.zIndex = "9999";

  // Append the animation container to the body
  document.body.appendChild(animationContainer);

  // Set the inner HTML of the animation container to the Lottie animation player
  animationContainer.innerHTML =
    '<dotlottie-player src="https://lottie.host/653499bf-f010-4969-9892-214dbfd64ff8/uI6A3n5C4I.json" background="transparent" speed="0.6" style="width: 750px; height: 750px;" loop autoplay></dotlottie-player>';

  // Create a div element for the overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent black color
  overlay.style.zIndex = "9998"; // Place the overlay below the animation container
  overlay.style.transition = "background-color 1s"; // Smooth transition for background color change

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Trigger reflow to ensure transition is applied
  void overlay.offsetWidth;

  // Gradually change the background color to dark
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black color

  // After 2 seconds, remove the overlay and the animation container
  setTimeout(() => {
    // Gradually change the background color back to transparent
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fully transparent black color

    // Remove the overlay and the animation container after the transition
    setTimeout(() => {
      overlay.remove();
      animationContainer.remove();
    }, 1000);
  }, 1000); // Wait for 1 second before starting to revert the transition
}