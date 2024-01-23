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
