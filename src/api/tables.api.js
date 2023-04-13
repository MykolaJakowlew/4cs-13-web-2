const { Router } = require('express');
const { TableHandlers } = require('./handlers');

const router = Router();

router.post('/tables', TableHandlers.createTable);
router.get('/tables', TableHandlers.getTables);
router.delete('/tables/:_id', TableHandlers.deleteTable);
router.patch('/tables/:_id', TableHandlers.updateTable);

module.exports = { router };