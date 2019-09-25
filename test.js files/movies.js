// code testing for omdb api

var keys = require('../keys')
var movieKey   = keys.movieKey.eb91656d;
var Movie = function () {
  this.movieSearch = function (movie) {

      const queryURL = "http://www.omdbapi.com/?apikey=eb91656d" + movieKey + "&t=" + movie;

      axios.get(queryURL).then(
          function (response) {
              const title = response.data.Title;
              const year = response.data.Year;
              const ratingFull = response.data.Ratings;
              const ratingArr = [];
              for (let i = 0; i < ratingFull.length; i++) {
                  let ratingSource = response.data.Ratings[i].Source;
                  let ratingValue = response.data.Ratings[i].Value;
                  ratingArr.push(ratingSource + ": " + ratingValue);
              }
              let ratingStr = ratingArr.join("  ");
              const country = response.data.Country;
              const language = response.data.Language;
              const plot = response.data.Plot;
              const actors = response.data.Actors;
              console.log('\n----------------------------------------\n')
              console.log(`Title: ${title + '\n'}\nYear: ${year}\nRatings: (${ratingStr})\nCountry: ${country}\nLanguage: ${language}\n\nPlot: ${plot}\n\nActors: ${actors}`)
              console.log('\n----------------------------------------\n')
          }
      )
  }
}

module.exports = Movie;