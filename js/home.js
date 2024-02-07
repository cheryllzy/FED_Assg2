// Function to check if user is logged in
function isLoggedIn() {
    const username = sessionStorage.getItem('username');
    return !!username; // Returns true if username exists, false otherwise
  }
  
  
  // Function to retrieve username from session storage
  function getUsername() {
    return sessionStorage.getItem('username');
  }
  
  if (isLoggedIn()) {
    console.log("User is logged in");
    const username = getUsername();
    console.log("Username:", username);
  } else {
    console.log("User is not logged in");
  }
  
