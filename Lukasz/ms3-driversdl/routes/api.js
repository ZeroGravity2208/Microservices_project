const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HELLO API HERE");
});

module.exports = router;
