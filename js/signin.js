document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const username = document.getElementById('exampleInputUsername').value;
    const password = document.getElementById('exampleInputPassword1').value;

    // Validate username
    const usernameValidationResult = validateUsername(username);
    if (!usernameValidationResult.isValid) {
        alert(usernameValidationResult.errorMessage);
        return;
    }

    // Validate password
    if (!isValidPassword(password)) {
        alert('Invalid password. Password must be at least 8 characters long.');
        return;
    }

    // Check if the username already exists
    fetch(`https://assignment2-1d63.restdb.io/rest/account?q={"username":"${username}"}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '65a4e6d5da104321e54ba32f'
        }
    })
    .then(response => response.json())
    .then(data => {
        // If username already exists, display an error alert
        if (data.length > 0) {
            alert('Username already exists. Please choose a different username.');
        } else {
            // If username is unique and password is valid, proceed with creating the account
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
                    alert('Sign up unsuccessful. Please check your username and password.');
                } else {
                    alert('Sign up successful!');
                }
            });
        }
    });
});

// Function to validate the username
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (username.length < 5) {
        return {
            isValid: false,
            errorMessage: 'Username must have more than 5 characters.'
        };
    }

    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            errorMessage: 'Username can only contain alphabets and numbers.'
        };
    }

    if (!/[a-zA-Z]/.test(username)) {
        return {
            isValid: false,
            errorMessage: 'Username must contain alphabets.'
        };
    }

    return {
        isValid: true
    };
}

// Function to validate the password
function isValidPassword(password) {
    return password.length >= 8;
}
