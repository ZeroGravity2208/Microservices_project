const express = require('express');
const router = express.Router();

const DAL = require('../DAL')
router.get('/', (req, res) => {
  DAL.zapusk_mashin((data, status) => res.status(status).json(data))
});

module.exports = router;