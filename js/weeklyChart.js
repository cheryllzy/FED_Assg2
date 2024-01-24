async function fetchData() {
  const date = "2024-01-15";
  const range = "1-10";

  const url = `https://billboard-api2.p.rapidapi.com/hot-100?date=${date}&range=${range}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a4123a0c9emshae37437481acf31p116ab5jsn6065e0210c9f",
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
