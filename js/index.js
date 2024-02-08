document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const username = document.getElementById("exampleInputUsername").value;
    const password = document.getElementById("exampleInputPassword1").value;

    // Send data to RestDB for login
    fetch(
      `https://assignment2-1d63.restdb.io/rest/account?q={"username":"${username}","password":"${password}"}`,
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
        console.log(data);

        // Check if login is successful
        if (data.length > 0) {
          // Store user information in session storage
          const userData = data[0]; // Assuming data contains user information
          sessionStorage.setItem("username", userData.username); // Assuming user ID is stored in "_id" field
          // Redirect to home.html after successful login
          window.location.href = "home.html";
        } else {
          alert("Login unsuccessful. Please check your username and password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });
