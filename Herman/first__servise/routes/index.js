const express = require('express');
const router = express.Router();

const DAL = require('../DAL')
const controller = require('../controller')
router.post('/', (req, res) => {
  controller.add_car((data, status) => {
    return res.status(status).json(data)
  }, req.body);
});

module.exports = router;