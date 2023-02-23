const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Comments } = require('./models/comments');
const movies = require('./api/movies.api');
const userAccount = require('./api/userAccount.api');

// process.env
console.log(`MONGO_DB_URI:${process.env.MONGO_DB_URI}`);
// console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI);

const Mongo = require('./setup/mongoose');

const app = express();
app.use(bodyParser.json());

const setup = async () => {
 await Mongo.setupDb(process.env.MONGO_DB_URI);

 app.use(movies.router);
 app.use(userAccount.router);

 const addMiddleware = (req, value) => {
  if (req.middlewares && Array.isArray(req.middlewares)) {
   req.middlewares.push(value);
  } else {
   req.middlewares = [value];
  }
 };

 const m1 = (req, res, next) => {
  console.log('M1');
  addMiddleware(req, "M1");
  // if (req.middlewares && Array.isArray(req.middlewares)) {
  //  req.middlewares.push("M1");
  // } else {
  //  req.middlewares = ["M1"];
  // }

  next();
 };
 const m2 = (req, res, next) => {
  console.log('M2');
  addMiddleware(req, "M2");
  // if (req.middlewares && Array.isArray(req.middlewares)) {
  //  req.middlewares.push("M2");
  // } else {
  //  req.middlewares = ["M2"];
  // }
  next();
 };
 const m3 = (req, res, next) => {
  console.log('M3');
  addMiddleware(req, "M3");
  // if (req.middlewares && Array.isArray(req.middlewares)) {
  //  req.middlewares.push("M3");
  // } else {
  //  req.middlewares = ["M3"];
  // }
  next();
 };
 const handler = (req, res) => {
  console.log('handler');
  req.middlewares.push("handler");
  res.status(200).send({
   middlewares: req.middlewares
  }); // => { middlewares: ["m1","m2", "handler"] }
 };
 app.get("/middleware", m3, m1, m2, handler);
 // "/middleware": [m1, m2, m3, handler]

 app.post("/comments", async (req, res) => {
  const { name, email, text } = req.body;

  const doc = new Comments({
   name, email, text, date: new Date()
  });

  const elem = await doc.save();

  return res.status(200).send(elem);
 });

 app.get("/comments", async (req, res) => {
  /**
   * All values are string
   */
  const { email, createdAt } = req.query;

  const queryDb = {};

  if (email) {
   queryDb.email = email;
  }

  if (createdAt) {
   /**
    * Повернути записи в яких поле date має значення більше за createdAt
    * $gt -- строго бліше
    * $gte -- більше рівне
    * $lte -- менше рівне
    * $lt -- строго менше
    */
   queryDb.date = { $gt: new Date(createdAt) };
  }

  const docs = await Comments.find(queryDb);

  return res.status(200).send(docs);
 });

 app.listen(process.env.PORT, () => {
  console.log(`Server was started on ${process.env.PORT}`);
 });
};

setup();