# Project Name: TuneTrivia

This innovative music website is designed to cater to the music enthusiasts, offering a unique blend of entertainment and exploration. Users can engage in exciting challenges such as guess the song and guess the artist, participate in a dynamic leaderboard, and stay updated with the latest music trends through the weekly chart.

# Design Process

This website is focusing on anyone who are interested and want to find out more about music through the website.As a music enthusiasts, they wil be more interested in the weekly chart to stay on trend in the music industry.As a gaming user, they would like to play the challenge and compete with others through a dynamic leaderboard.

I used Figma software to create my wireframe.Below is the attached link for the desktop view and mobile view.

desktop view: https://www.figma.com/file/nIPvL4REO2AdfSY6jLGUfU/Fed-Assignment-2-Desktop-view?type=design&node-id=0%3A1&mode=design&t=2LCvl6hhYSrST0nF-1

mobile view:https://www.figma.com/file/849taZXZFj7WeMnz7PvyEb/FED-assignment-2-Mobile-view?type=design&mode=design&t=2LCvl6hhYSrST0nF-1

# Features

In this section, I will go over the different parts of my project, and describe each in a sentence or so.

Existing Features

Feature 1 - allow user to login by having them fill up the login details such as username and password.Information will be retrived from the RestDB

Feature 2 - allow user to signup by having them fill up the login details such as username and password.Infomation will be stored in RestDB

Feature 3 - allow user to navigate around the pages using the menus bar in the homepage

Feature 4 - allow user to guess the song using lyrics and earn repective point in various challenge(easy 5 point each,intermediate 10 points each,hard 15 points each).API is used here to extract the song lyrics and songn title for the answer

Feature 5 - allow user to guess the artist using album name and earn points in the challenge (5 points each).API is used here to extract the album name and artist name for the answer

Feature 6 - allow user to look out for the lastest trend of music for the past week.API is used here for extracting the trending music for the past week

Feature 7 - allow user to view who is leading in the leaderboard with the highest amount of points.Infomation will be taken from the RestDB and the points will be updated once the user got the correct answer in the challenges.

In addition, I will use this section to discuss plans for additional features to be implemented in the future:
Feature idea:
Implementing a real-time chat feature for users to discuss and share music insights.
Input new interactive calendar - for user to see furture music event and have a heads up.

# Technologies Used

HTML:
The project uses html to create a basic structure of the website.
Testing
Official website:https://html.spec.whatwg.org/

CSS:
The project use css for styling and layout, ensuring a visually appealing and consistent design across the website.
Offical website: https://www.w3.org/Style/CSS/Overview.en.html

Javascript:
The project use JavaScript to adds interactivity and dynamic features to the website, enhancing the user experience.
example like vaildation,local storeage
Offical website:https://developer.mozilla.org/en-US/docs/Web/JavaScript

Github:
The project use github is a code hosting platform for version control and collaboration.It also allow version tracking
Offical website:https://github.com/

Figma(WireFrame):
The project use Figma for prototyping, and user interface (UI) design.
Example like how does the website in desktop look like in the mobile view.Quick look on how the overview layout look like and able to follow to do the final code using html,css,javascript.
Offical website:https://www.figma.com/

RestDB:
This project use RestDB to store and retrieve user information, leaderboard data
Offical Website:https://restdb.io/

Bootstrap:
This project use bookstrap to create a responsive design that adapts seamlessly to different screen sizes and devices.
Offical website:https://getbootstrap.com/

RapidAPI:
This project use RapidAPI to extract song lyrics, album names,artist information,and weekly chart songs to enhance the user experience.
Offical website:https://rapidapi.com/

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, example:

special bugs:

# Tested

In addition, this section I will show how my project looks and works on different browsers and screen sizes.

The project has been tested on multiple browsers (google chrome(default),Firefox,Internet explorer,mircosoft edge) to ensure a consistent user experience.The project is fully compatible with the different browser, displaying as intended..

# Credits:

SVG used for home.html cards were taken from svgrepo.com

(Challenge: Guess the Song) - https://www.svgrepo.com/svg/499628/music-note
(Challenge: Guess the Artist) - https://www.svgrepo.com/svg/383635/microphone-sing-voice-studio-record
(Weekly Chart) - https://www.svgrepo.com/svg/383640/scores-notes-audio
(Leaderboard) - https://www.svgrepo.com/svg/325337/leaderboard-star

API Used for challenge 1(guess the song), challenge 2 (guess the artist), weekly chart

challenge 1(guess the song) , challenge 2 (guess the artist) - https://rapidapi.com/Glavier/api/genius-song-lyrics1
weekly chart - https://rapidapi.com/LDVIN/api/billboard-api

transition animation - https://lottiefiles.com/animations/music-sound-equalizer-loader-7AMojzJim6

correct - https://lottiefiles.com/animations/congratulations-0UvPfxrW4h
wrong - https://lottiefiles.com/animations/cross-MhToAP9KFt
loading - https://lottiefiles.com/animations/loading-spinner-dots-d1QHolDFMF
