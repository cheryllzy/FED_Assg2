console.log("Need to wait");

setTimeout(function () {
  console.log("setting window location");
  window.location.href = "https://www.np.edu.sg"; //change the website to our own local page
}, 5000); // Change the timeout duration to 5000 milliseconds (5 seconds)
