const { Router } = require('express');

const DishesAPI = require('./dishes.api');
const OrdersAPI = require('./orders.api');
const TablesAPI = require('./tables.api');
const WaitersAPI = require('./waiter.api');

const router = Router();

router.use(DishesAPI.router);
router.use(OrdersAPI.router);
router.use(TablesAPI.router);
router.use(WaitersAPI.router);

module.exports = { router };