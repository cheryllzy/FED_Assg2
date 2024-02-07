document.addEventListener("DOMContentLoaded", () => {
  // Fetch leaderboard data
  fetch("https://assignment2-1d63.restdb.io/rest/account", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "65a4e6d5da104321e54ba32f",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Filter data to include only entries with points greater than 0
      const filteredData = data.filter((entry) => entry.points > 0);

      // Sort the filtered data in descending order based on 'points'
      filteredData.sort((a, b) => b.points - a.points);

      // Populate the cards with the first three elements of the filtered data
      for (let i = 0; i < 3; i++) {
        // Select the card element by its index
        const card = document.querySelectorAll('.card-body')[i];
        // Select the username element within the card
        const username = card.querySelector(".card-text[data-username]");
        // Select the points element within the card
        const points = card.querySelector(".card-text[data-points]");
        // Update the text content of the elements with the data
        const rank = i === 0 ? "1st Place" : i === 1 ? "2nd Place" : "3rd Place";
        username.textContent = `Username: ${filteredData[i].username}`;
        points.textContent = `Points: ${filteredData[i].points}`;
        card.querySelector(".card-title").textContent = rank;
      }

      // Populate the table with the remaining elements of the filtered data
      const leaderboardBody = document.getElementById("leaderboardBody");

      for (let i = 3; i < filteredData.length; i++) {
        // Create a new table row element
        const tableRow = document.createElement("tr");
        // Create a new table cell element for the rank
        const rankCell = document.createElement("td");
        // Set the text content of the rank cell with the index
        rankCell.textContent = i + 1;
        // Append the rank cell to the table row
        tableRow.appendChild(rankCell);
        // Create a new table cell element for the username
        const usernameCell = document.createElement("td");
        // Set the text content of the username cell with the data
        usernameCell.textContent = filteredData[i].username;
        // Append the username cell to the table row
        tableRow.appendChild(usernameCell);
        // Create a new table cell element for the points
        const pointsCell = document.createElement("td");
        // Set the text content of the points cell with the data
        pointsCell.textContent = filteredData[i].points;
        // Append the points cell to the table row
        tableRow.appendChild(pointsCell);
        // Append the table row to the table body
        leaderboardBody.appendChild(tableRow);
      }
    })
    .catch((error) => console.error("Error fetching leaderboard data:", error));
});
