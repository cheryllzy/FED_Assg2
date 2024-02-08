# Project Name: TuneTrivia

This innovative music website is designed to cater to the music enthusiasts, offering a unique blend of entertainment and exploration. Users can engage in exciting challenges such as guess the song and guess the artist, participate in a dynamic leaderboard, and stay updated with the latest music trends through the weekly chart.

## Design Process

This website for anyone interested in finding out more about music. With the implemented games and weekly chart, music enthusiasts will be able to test their knowledge and also stay on top of the latest hits in the music industry. With the leaderboard, players can also compete for the top spot.

As someone who is interested in music, I want to be able to broade my horizons with a gamification element to it. By playing the challenges, I can learn more about different songs as well as what artist it was made by. With this, I will be able to enjoy a wider range of music. 

- used Figma software to create my wireframe. Below is the attached link for the desktop view and mobile view.

Desktop View: https://www.figma.com/file/nIPvL4REO2AdfSY6jLGUfU/Fed-Assignment-2-Desktop-view?type=design&node-id=0%3A1&mode=design&t=2LCvl6hhYSrST0nF-1

Mobile View:https://www.figma.com/file/849taZXZFj7WeMnz7PvyEb/FED-assignment-2-Mobile-view?type=design&mode=design&t=2LCvl6hhYSrST0nF-1


## Features

Existing Features

1) Log in - Allows user to login by having them fill up the login details such as username and password. It then allows access into the home page if login details match the data on RestDB.

2) Sign Up - Allows user to signup by having them fill up the details such as username and password. These details will then be stored into RestDB to allow them to log in with the same account. 

3) Session Storage -  The session storage allows the storage of the username to be able to access the account and update the number of points. If the user gains points from any of the challenges, it will be reflected in their accounts. 

4) Home Page - Allows user to navigate around the pages using the 4 cards.

5) Challenge 1 (Guess the Song) - Allows users to guess the song using lyrics and earn the respective points depending on the difficulty chosen. Genius API is used here to extract the song lyrics and song title. 

6) Challenge 2 (Guess the Artist) - Allows user to guess the artist using album name and earn points. Genius API is used here to extract the album name and artist name.

7) Weekly Chart - Allows user to look out for the lastest trend of music from the past week.Billboard API is used here to extracting the rank and song title.

8) Leaderboard - Allow users to view the leading players with the highest number of points.The points are stored and retrieved from RestDB. It then ranks the players from highest to lowest points. 

Additional features to implement in the future: 
Implementing a real-time chat feature for users to discuss and share music insights.
Input new interactive calendar - for user to see furture music event and have a heads up.
Adding a timer to the challenges. 

## Technologies Used

HTML:
The project uses html to create a basic structure of the website.
Testing
Official website:https://html.spec.whatwg.org/

CSS:
The project uses css for styling and layout, ensuring a visually appealing and consistent design across the website.
Official website: https://www.w3.org/Style/CSS/Overview.en.html

Javascript:
The project uses JavaScript to adds interactivity and dynamic features to the website, enhancing the user experience. 
Official Website:https://developer.mozilla.org/en-US/docs/Web/JavaScript

Github:
The project uses Github because it is a code hosting platform for version control and collaboration.
Official Website:https://github.com/

Figma (WireFrame):
The project uses Figma for prototyping, and user interface (UI) design. It was used to view the layout in both desktop and mobile view. 
Official Website:https://www.figma.com/

RestDB:
This project uses RestDB to store and retrieve user information, leaderboard data.
Official Website: https://restdb.io/

Bootstrap:
This project uses bookstrap to create a responsive design that adapts seamlessly to different screen sizes and devices.
Official Website: https://getbootstrap.com/

RapidAPI:
This project uses GeniusAPI and Billboard via RapidAPI to extract song lyrics, album names, artist information, and weekly chart songs.
Official Website: https://rapidapi.com/

Lottie:
This project uses LottieAnimation to add animations to the project, allowing a better visual experience. 
Official Website: https://lottiefiles.com/

Youtube:
This project uses YouTube for the music mp3s.
Official Website: https://youtube.com/

Howler JS:
This project uses Howler JS to play audios seamlessly. 
Official Website: https://howlerjs.com/

## Testing
The project has been tested on multiple browsers (Google chrome (default), Firefox,Internet Explorer, Microosoft Edge) to ensure a consistent user experience.The project is fully compatible with the different browser, displaying as intended.

## Credits:
SVG used for home.html cards were taken from svgrepo.com

(Challenge: Guess the Song) - https://www.svgrepo.com/svg/499628/music-note
(Challenge: Guess the Artist) - https://www.svgrepo.com/svg/383635/microphone-sing-voice-studio-record
(Weekly Chart) - https://www.svgrepo.com/svg/383640/scores-notes-audio
(Leaderboard) - https://www.svgrepo.com/svg/325337/leaderboard-star

APIs were taken from RapidAPI.
Challenge 1 and 2: https://rapidapi.com/Glavier/api/genius-song-lyrics1
Weekly Chart: https://rapidapi.com/LDVIN/api/billboard-api

API for Leaderboard was via RestDB.
Leaderboard: https://restdb.io/account/databases

Transitions were all taken from LottieFiles.
Challenge 1
 - https://lottiefiles.com/animations/congratulations-0UvPfxrW4h
 - https://lottiefiles.com/animations/loading-bar-B9hV6bx6z4
 - https://lottiefiles.com/animations/cross-MhToAP9KFt

Challenge 2
- https://lottiefiles.com/animations/congratulations-0UvPfxrW4h 
- https://lottiefiles.com/animations/loading-bar-B9hV6bx6z4
- https://lottiefiles.com/animations/cross-MhToAP9KFt

Weekly Chart/Leaderboard 
- https://lottiefiles.com/animations loading-spinner-dots-d1QHolDFMF

Music was taken from Youtube:
- https://youtu.be/V-VopYUQXRQ?si=1smhy5HXL0lO2gg8
- https://youtu.be/PaSvjT8nSP8?si=JWW-IjttpT07CwbM
- https://youtu.be/v6ELNT542-I?si=a-cpGcNCQ2PHFL0l
- https://youtu.be/j2OarLaSw1w?si=ZsbW86xGOgqKAl9t
- https://youtu.be/xc_0wfIuuzw?si=pXzaT9QWUv5XqHMQ


