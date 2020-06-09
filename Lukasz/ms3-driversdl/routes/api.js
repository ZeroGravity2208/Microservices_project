const express = require("express");
const router = express.Router();
const controller = require("../controller");
const DAL = require("../DAL");

router.get("/", (req, res) => {
  res.send("HELLO API HERE");
});

//Add new driver's driving license
router.post("/add", (req, res) => {
  controller.post((data, status) => res.status(status).json(data), req.body);
});

module.exports = router;
