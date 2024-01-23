document
        .getElementById("loginForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          // Get form data
          const username = document.getElementById(
            "exampleInputUsername"
          ).value;
          const password = document.getElementById(
            "exampleInputPassword1"
          ).value;

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
              // Handle the login response
              console.log(data);

              // Display alert based on the response
              if (data.length > 0) {
                alert("Login successful!");
              } else {
                alert(
                  "Login unsuccessful. Please check your username and password."
                );
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("An error occurred. Please try again.");
            });
        });