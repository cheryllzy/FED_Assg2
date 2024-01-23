//Add API url and website
const url =
  "https://billboard-api2.p.rapidapi.com/hot-100?date=2024-01-15&range=1-10";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f69c30f9d6msh672713a3ae759b0p188a2djsn8ea3363cbb73",
    "X-RapidAPI-Host": "billboard-api2.p.rapidapi.com",
  },
};

async function fetchData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result); // Log the entire API response to the console
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
    for (let i = 1; i <= 10; i++) {
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
  }
}

// Call the fetchData function when the page loads
fetchData();
