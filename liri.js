// Liri.js 

require('dotenv').config();

// Require data from Axios npm package
var axios = require('axios');

// Require data from File System npm package
var fs = require('fs');

// Require data from moment npm package
var moment = require('moment');

// CHANGE  CODE  FOR  THE VAR
var Movie = require('./test.js files/movies.js/index.js');
var movie = new Movie();
// Requiring our Movies function exported from omdb.js
var myConcert = require("./test.js files/concerts.js/index.js");

var request = require('request');


//Creates initial user command.
var userCommand = process.argv[2];
//Creates user input.
var userInput = process.argv.splice(3, process.argv.length).join(' ');

// argv[3] is input parameter
var secondCommand = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
  secondCommand += '+' + process.argv[i];
}

//Program conditions 
switch (userCommand) {
  // help function to clarify commands used
  case "help":
    console.log("Please type one of these commands\n" +
      "'concert-this': to search your favorite artist concerts\n" +
      "'spotify-this-song': to search your favorite song\n" +
      "'movie-this': to search your favorite movie \n" +
      "'do-what-it-says': using command from random.txt \n"
    );
    break;
  case "concert-this":
    myConcert(userInput);
    break;
  case "spotify-this-song":
    mySpotify(userInput);
    break;
  case "movie-this":
    getMovies(userInput);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  //if anything else written
  default:
    console.log("LIRI doesn't understand that - Please type 'node liri.js help' for more information");
};

// ======= Spotify API ======= //

//v-- meant for individual testing --v
// var fs = require("fs");
// var axios = require("axios");
// var moment = require('moment');
// console.log('variables_loaded!')


var search = process.argv.splice(3).join(' ')

var spotifyObj = {
  type: "track",
  query: search,
  limit: 1
}

var command = process.argv[2];

//  Spotify-this-song commmand
switch (command) {
  case 'spotify-this-song':
    console.log('\nSearching Spotify for ' + search + '.....\n')
    if (search === undefined || search === "") {
      spotifyObj.query = "Es Gratis";
      spotify.spotifySearch(spotifyObj);
    } else {
      spotify.spotifySearch(spotifyObj);
    }
    break;
  case 'concert-this':
    console.log('\nSearching concerts for ' + search + '.....\n\n----------------------------------------\n')
    concert.concertSearch(search)
    break;
  case 'movie-this':
    console.log('\nSearching movies for ' + search + '.....\n')
    movie.movieSearch(search)
    break;
  case 'do-what-it-says':
    fs.readFile('./random.txt', "utf8", function (err, data) {
      if (err) throw err;
      spotifyObj.query = data;
      console.log('\nSearching Spotify for ' + data + '.....\n')
      spotify.spotifySearch(spotifyObj);
    });
    break;
  default:
    console.log('Enter a command');
}

var appendSearch = (command, search) => {
  fs.appendFile("searches.txt", "\n" + command + ": " + search, function (err) {
    if (err) {
      console.log(err);
    }
  });
}
appendSearch(command, search);


// ========= OMDB MOVIE API ========= //

//v-- meant for individual testing --v
// var fs = require("fs");
// var axios = require("axios");
// var moment = require('moment');
// console.log('variables_loaded!')

//OMDB Movie - command: movie-this
function getMovies() {
  // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
  var movieName = secondCommand;
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=eb91656d" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    // If the request is successful = 200
    if (!error && response.statusCode === 200) {
      request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var info = JSON.parse(body);
          console.log("Title: " + info.Title)
          console.log("Release Year: " + info.Year)
          console.log("OMDB Rating: " + info.Ratings[0].Value)
          console.log("Rating: " + info.Ratings[1].Value)
          console.log("Country: " + info.Country)
          console.log("Language: " + info.Language)
          console.log("Plot: " + info.Plot)
          console.log("Actors: " + info.Actors)

          //Append data to log.txt
          fs.appendFileSync("log.txt", "Title: " + info.Title + "\nRelease Year: " + info.Year + "\nIMDB Rating: " + info.Ratings[0].Value + "\nRating: " +
            info.Ratings[1].Value + "\nCountry: " + info.Country + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors: " + info.Actors + "\n----------------\n",
            function (error) {
              if (error) {
                console.log(error);
              };
            });
        }
        //Response if user does not type in a movie title
        if (movieName === "Shrek 2") {
          console.log("-----------------------");
          console.log("If you haven't watched 'Shrek 2,' then you should: https://www.imdb.com/title/tt0298148/");
          console.log("It's God Tier");
        }
      });
    }
  });
}



// test code for bandsintown api
// function getBands(artist) {
//   // var artist = value;

//   axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//     .then(function (response) {
//       console.log("Name of the venue:", response.data[0].venue.name);
//       console.log("Venue location:", response.data[0].venue.city);
//       var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
//       console.log("Date of the Event:", eventDate);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }


//  ======= BandsInTown API ======= //


//v-- meant for individual testing --v
// var fs = require("fs");
// var axios = require("axios");
// var moment = require('moment');
// console.log('variables_loaded!')

function myConcert(userInput) {
  var artist = userInput;
  var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.id;

  axios.get(url).then(
    function (response) {
      // console.log(response.data)
      for (var i = 0; i < response.data.length; i++) {
        console.log("Concert Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
        console.log("Concert Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
        console.log("Concert Venue: " + response.data[i].venue.name);
        console.log('--------------------------------------------------')
        fs.appendFileSync('log.txt', "\r\n" + "Concert Search Log----------------------" + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Venue Name: " + response.data[i].venue.name + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Venue Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A') + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "-----------------------------------------" + "\r\n", 'utf8');
      }
    }
  );

};

// Exporting the function which we will use in main.js
module.exports = myConcert;

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
    getBands(value)
    break;
  case "spotify-this-song":
    //If user has not specified a song , use default
    // if (value === "") {
    //   value = defaultSong;
    // }
    getSongs(value)
    break;
  case "movie-this":
    //If user has not specified a movie , use default
    if (value == "") {
      value = defaultMovie;
    }
    getMovies(value)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;
  default:
    break;
}

