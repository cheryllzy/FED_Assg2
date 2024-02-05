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

      // Populate the leaderboard table with fetched, sorted, and filtered data
      const leaderboardBody = document.getElementById("leaderboardBody");

      filteredData.forEach((entry) => {
        const row = document.createElement("tr");

        // Display username and points
        const usernameCell = document.createElement("td");
        usernameCell.textContent = entry.username;
        row.appendChild(usernameCell);

        const pointsCell = document.createElement("td");
        pointsCell.textContent = entry.points;
        row.appendChild(pointsCell);

        leaderboardBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching leaderboard data:", error));
});
