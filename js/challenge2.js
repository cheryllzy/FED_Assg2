// Add API Link and Key
const url =
  "https://genius-song-lyrics1.p.rapidapi.com/chart/albums/?time_period=week&per_page=10&page=1";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a4123a0c9emshae37437481acf31p116ab5jsn6065e0210c9f",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let retries = 0;

function clearFeedback() {
  document.getElementById("feedback").innerText = "";
}

function showCorrectAnswer() {
  const albumBox = document.getElementById("album-box");
  const correctAnswer = albumBox.dataset.correctAnswer;

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
      }
    }

    const result = await response.json();
    console.log("API Response:", result);

    const chartItems = result.chart_items;

    if (!chartItems || chartItems.length === 0) {
      throw new Error("Invalid response or no albums found.");
    }

    console.log("Sample Album Object:", chartItems[0].item);

    const albumBox = document.getElementById("album-box");
    const randomAlbum =
      chartItems[Math.floor(Math.random() * chartItems.length)].item;

    // Ensure the 'name' property exists before attempting to access it
    const albumName = randomAlbum.name || "N/A";

    console.log("Random Album:", { name: albumName });

    albumBox.innerText = "Album Name: " + albumName;
    albumBox.dataset.correctAnswer = albumName;

    clearFeedback();
  } catch (error) {
    console.error(error);
  }
}

function submitAnswer() {
  const userAnswer = document.getElementById("answer-input").value;
  const correctAnswer =
    document.getElementById("album-box").dataset.correctAnswer;

  if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    document.getElementById("feedback").innerText = "Correct Answer!";
  } else {
    document.getElementById("feedback").innerText =
      "Incorrect Answer. Try again.";
    showCorrectAnswer(); // Call the function to show the correct answer
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
