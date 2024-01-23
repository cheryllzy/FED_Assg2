//Add API Link and Key
const url =
  "https://genius-song-lyrics1.p.rapidapi.com/artist/albums/?id=344497&per_page=20&page=1";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f69c30f9d6msh672713a3ae759b0p188a2djsn8ea3363cbb73",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

//clear feedback function
function clearFeedback() {
  //.innerText = "";: retrieved element to an empty string,
  //effectively removing any text content inside the "feedback" element
  document.getElementById("feedback").innerText = "";
}

async function fetchData() {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    console.log("API Response:", result);

    const albums = result.albums;

    if (!albums || albums.length === 0) {
      throw new Error("Invalid response or no albums found.");
    }

    // Log the structure of a sample album object
    console.log("Sample Album Object:", albums[0]);

    // Logic to handle displaying the album name in the box
    const albumBox = document.getElementById("album-box");
    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
    const correctAnswer = randomAlbum.artist.name; // Extract the artist's name

    // Display the album name without validation
    albumBox.innerText = "Album Name: " + (randomAlbum.name || "N/A");

    // Store the correct answer for later validation
    albumBox.dataset.correctAnswer = correctAnswer;

    // Clear previous feedback
    clearFeedback();
  } catch (error) {
    console.error(error);
  }
}
function submitAnswer() {
  // Logic to check the user's answer
  const userAnswer = document.getElementById("answer-input").value;
  const correctAnswer =
    document.getElementById("album-box").dataset.correctAnswer;

  // Case-insensitive comparison
  if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    document.getElementById("feedback").innerText = "Correct Answer!";
  } else {
    document.getElementById("feedback").innerText =
      "Incorrect Answer. Try again.";
  }
}

function nextQuestion() {
  // Check if there is a specific condition before moving to the next question
  if (confirm("Do you really want to move to the next question?")) {
    // Logic to move to the next question
    fetchData();
  }
}

// Initial data fetch when the page loads
fetchData();
