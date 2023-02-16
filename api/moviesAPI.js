const { Router } = require('express');
const { Movies } = require('../models/movies');

const router = Router();

router.get('/movies', async (req, res) => {
 const queryDb = {};
 const {
  // Example: "Western,Drama"
  genres,
  // default 0
  skip = 0,
  // default 10
  limit = 10
 } = req.query;

 if (genres) {
  const parsedGenres = genres.split(','); // ["Western", "Drama"]
  queryDb.genres = { $in: parsedGenres };
 }

 const movies = await Movies.find(queryDb).skip(skip).limit(limit);
 return res.status(200).send(movies);
});

module.exports = { moviesAPiRouter: router };