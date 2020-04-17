const express = require('express');
const router = express.Router();
// const Policemen = require('./../models/policemen');
const DAL = require('./../DAL');
const service = require('./../service');
const controller = require('./../controller');

/* GET home page. */
router.get('/policemen', (req, res) => {
  DAL.getPolicemen(data => res.json(data))
});

router.get('/policeman/get/:id', (req, res) => {
  // DAL.getPoliceman(data => res.json(data), req.params.id);
  // service.getPoliceman(data => res.json(data), req.params.id);
  controller.getPoliceman((data, status) => res.status(status).json(data), req.params.id);
});

router.get('/policeman/add', (req, res) => {
  res.render('policemen-form', {
    title: 'Dodaj policjanta',
  });
});

router.post('/policeman/add', (req, res) => {
  controller.postPoliceman((data, status) => res.status(status).json(data), req.body)
})

router.patch('/policeman/update/:id', (req, res) => {
  controller.patchPoliceman(data => res.json(data), req.params.id)
})


router.delete('/policeman/delete/:id', (req, res) => {
  DAL.deletePoliceman(data => res.json(data), req.params.id)
})

router.get('/policeman/delete/:id', (req, res) => {
  DAL.deletePoliceman(data => res.json(data), req.params.id)
})

module.exports = router;