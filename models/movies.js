const { Schema, model } = require('mongoose');

const schema = new Schema({
 plot: { type: String },
 genres: { type: [String] }, // => ["genre 1", "genre 2"]
 runtime: { type: Number },
 cast: { type: [String] },
 num_mflix_comments: { type: Number },
 title: { type: String },
 fullplot: { type: String },
 countries: { type: [String] },
 released: { type: Date },
 directors: { type: [String] },
 rated: { type: String },
 awards: {
  wins: { type: Number },
  nominations: { type: Number },
  text: { type: String },
 },
 lastupdated: { type: String },
 year: { type: Number },
 type: { type: String },
 imdb: {
  rating: { type: Number },
  votes: { type: Number },
  id: { type: Number },
 },
 tomatoes: {
  lastUpdated: { type: String },
  viewer: {
   rating: { type: Number },
   numReviews: { type: Number },
   meter: { type: Number },
  }
 }
});

const Movies = new model(
 'movies',
 schema,
 'movies'
);

module.exports = { Movies };