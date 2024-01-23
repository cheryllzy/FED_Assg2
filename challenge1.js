//Add Api URL and Key
const apiUrl =
  "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871";
const apiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f69c30f9d6msh672713a3ae759b0p188a2djsn8ea3363cbb73",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

let chorusText = ""; // Variable to store the Chorus text
let correctAnswers = ["faded"]; //Correct answer to the blank
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
