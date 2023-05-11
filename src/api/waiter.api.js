const { Router } = require('express');
const { wrapperApi } = require('../shared/wrapperApi');
const { Waiters } = require('../models');

const router = Router();

const craterWaiter = async (req, res) => {
 const { firstName } = req.body;
 const waiter = new Waiters({ firstName });
 const doc = await waiter.save();
 return res.status(200).send(doc);
};

const getWaiters = async (req, res) => {
 const waiters = await Waiters.find();
 return res.status(200).send(waiters);
};

router.post('/waiters', wrapperApi(craterWaiter));
router.get('/waiters', wrapperApi(getWaiters));

module.exports = { router };