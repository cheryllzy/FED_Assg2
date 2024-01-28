console.log("Need to wait");

setTimeout(function () {
  console.log("setting window location");
  window.location.href = "https://www.np.edu.sg"; //change the website to our own local page
}, 3000); // Change the timeout duration to 3000 milliseconds (3 seconds)
