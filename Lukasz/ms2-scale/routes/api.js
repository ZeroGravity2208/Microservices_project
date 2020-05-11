const express = require("express");
const router = express.Router();
const DAL = require("./../DAL");
const controller = require("./../controller");

router.get("/scales", (req, res) =>
  DAL.getScales((data, status) => res.status(status).json(data))
);

router.get("/scale/:id", (req, res) =>
  controller.getScale(
    (data, status) => res.status(status).json(data),
    req.params.id
  )
);

router.post("/scale/add", (req, res) => {
  controller.postScale(
    (data, status) => res.status(status).json(data),
    req.body
  );
});

router.put("/scale/update", (req, res) => {
  controller.putScale(
    (data, status) => res.status(status).json(data),
    req.body
  );
});

router.delete("/scale/delete/:id", (req, res) => {
  // DAL.deletePoliceman(data => res.json(data), req.params.id)
  controller.deleteScale(
    (data, status) => res.status(status).json(data),
    req.params.id
  );
});

module.exports = router;
