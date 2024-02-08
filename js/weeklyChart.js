async function fetchData() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = `${yyyy}-${mm}-${dd}`;
  console.log(formattedToday); // Get datetime now 

  const range = "1-10";

  const url = `https://billboard-api2.p.rapidapi.com/hot-100?date=${formattedToday}&range=${range}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3aa13c23afmsh893d1a34146fa05p1a0076jsnde94a7216694",
      "X-RapidAPI-Host": "billboard-api2.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Assuming the API returns JSON data
    console.log(result);
    displayTable(result);
  } catch (error) {
    console.error(error);
  }
}

function displayTable(data) {
  const tableBody = document.getElementById("tableBody");

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Check if content exists
  const content = data && data.content;

  if (content) {
    // Loop through the properties of the 'content' object
    for (let i = 0; i < 10; i++) {
      const item = content[i];

      if (item) {
        const row = document.createElement("tr");

        // each item has 'rank', 'title', and 'artist' properties
        const rankCell = document.createElement("td");
        rankCell.textContent = item.rank;
        row.appendChild(rankCell);

        const titleCell = document.createElement("td");
        titleCell.textContent = item.title;
        row.appendChild(titleCell);

        const artistCell = document.createElement("td");
        artistCell.textContent = item.artist;
        row.appendChild(artistCell);

        tableBody.appendChild(row);
      }
    }
  } else {
    console.error("Invalid or missing data format");
    // Display a user-friendly error message on the webpage
    tableBody.innerHTML =
      "<tr><td colspan='3'>Invalid or missing data</td></tr>";
  }
}

// Call fetchData to initiate the data retrieval and display
fetchData();

// use arrow button to go back to home page
function goBack() {
  window.history.back();
}