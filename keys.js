
// console.log('Spotify API is loaded. ');

exports.spotify = {
  // issue with id spotify gave, the id but '58e11797791741f7a68f723a35da1a2b'
  // wont work since it starts with a number.
  id: process.env.a58e11797791741f7a68f723a35da1a2b,
  secret: process.env.af701fffce874b7a9fd479a74b48aeac
};

// console.log('OMDB API is loaded. ');

exports.omdb = {
  id: process.env.eb91656d,
};

// console.log('Bands In Town API is loaded. ');

exports.bandsInTown = {
  id: process.env.BANDS_IN_TOWN_ID,
};

