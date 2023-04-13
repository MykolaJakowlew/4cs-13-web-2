const { Router } = require('express');

const TablesAPI = require('./tables.api');

const router = Router();

router.use(TablesAPI.router);

module.exports = { router };