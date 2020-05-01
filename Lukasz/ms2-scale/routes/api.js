const express = require("express");
const router = express.Router();
const DAL = require("./../DAL");

router.get("/scale", (req, res) =>
  DAL.getScale((data, status) => res.status(status).json(data))
);

module.exports = router;
