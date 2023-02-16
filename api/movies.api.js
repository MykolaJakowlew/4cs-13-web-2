const { Router } = require('express');
const { Movies } = require('../models/movies');

const router = Router();

/**
 * GET http://localhost:8080/movies?year=2000&skip=10&limit=10&imdb_rating=5&period_year=2000,2005
 */
router.get("/movies", async (req, res) => {
 // const year = req.query.year;
 const {
  year,
  imdb_rating,
  period_year,
  skip = 0,  // default value 0
  limit = 10 // default value 10
 } = req.query;

 const queryDb = {};

 if (year) {
  /**
   * $gte -- більше або рівне
   * $gt -- більше
   * $lte -- менше або рівне
   * $lt -- менше
   */
  queryDb.year = { $gte: year }; // більше або рівне
 }

 if (imdb_rating) {
  queryDb["imdb.rating"] = { $gte: imdb_rating };
 }

 if (period_year) {
  if (year) {
   return res.status(400).send({
    message: 'Request can not contain both field: year,period_year'
   });
  }
  // period_year => 2000,2005
  // period_year.split(',') => ["2000", "2005"]
  const [from, to] = period_year.split(',').map(e => parseInt(e, 10));
  // from => 2000
  // to   => 2005
  if (from > to) {
   return res.status(400).send({
    message: `Parameter period_year can not have first number bigger than second number`
   });
  }
  queryDb.year = { $gte: from, $lte: to };
 }

 console.debug(`movies query:${JSON.stringify(queryDb)}`);
 const docs = await Movies.find(queryDb).skip(skip).limit(limit);

 return res.status(200).send(docs);
});

module.exports = { router };