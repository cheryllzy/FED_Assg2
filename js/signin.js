document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const username = document.getElementById('exampleInputUsername').value;
    const password = document.getElementById('exampleInputPassword1').value;

    // TODO: Hash the password before sending it (you can use libraries like bcrypt.js)

    // Send data to RestDB for login
    fetch('https://assignment2-1d63.restdb.io/rest/account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '65a4e6d5da104321e54ba32f'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the login response
        console.log(data);

        // Display alert based on the response
        if (data.error) {
            alert('Login unsuccessful. Please check your username and password.');
        } else {
            alert('Login successful!');
        }
    });
  });