const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const { setupConnectionToDb } = require('./setup/mongoose');
const API = require('./api');

const app = express();

const bootstrap = async () => {
 app.use(bodyParser);
 app.use(cors);

 await setupConnectionToDb();

 app.use(API.router);

 app.listen(process.env.PORT, () => console.log(`Server was started on ${process.env.PORT}`));
};

bootstrap();