const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Comments } = require('./models/comments');

// process.env
console.log(`MONGO_DB_URI:${process.env.MONGO_DB_URI}`);
// console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI);

const Mongo = require('./setup/mongoose');

const app = express();
app.use(bodyParser.json());

const setup = async () => {
 await Mongo.setupDb(process.env.MONGO_DB_URI);

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