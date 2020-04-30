const express = require('express');
const router = express.Router();
// const Policemen = require('./../models/policemen');
const DAL = require('./../DAL');
const service = require('./../service');
const controller = require('./../controller');

// spis wszystkich policjantow
router.get('/policemen', (req, res) => {
  DAL.getPolicemen(data => res.json(data))
});


// informacje o policjancie po id
router.get('/policeman/get/:id', (req, res) => {
  // DAL.getPoliceman(data => res.json(data), req.params.id);
  // service.getPoliceman(data => res.json(data), req.params.id);
  controller.getPoliceman((data, status) => res.status(status).json(data), req.params.id);
});

// formularz dodawania policjanta
// router.get('/policeman/add', (req, res) => {
//   res.render('policemen-form', {
//     title: 'Dodaj policjanta',
//   });
// });

// dodawanie policjanta
router.post('/policeman/add', (req, res) => {
  controller.postPoliceman((data, status) => res.status(status).json(data), req.body)
  // res.json(req.body)
})

// formularz edycji policjanta
// router.get('/policeman/update', (req, res) => {
//   res.render('patch-from', {
//     title: 'Edytuj policjanta',
//   });
// })


// edycja policjanta
router.put('/policeman/update', (req, res) => {
  controller.patchPoliceman((data, status) => res.status(status).json(data), req.body)
  // res.json(req.body)
})


//usuwanie policjanta po id
router.delete('/policeman/delete/:id', (req, res) => {
  // DAL.deletePoliceman(data => res.json(data), req.params.id)
  controller.deletePoliceman((data, status) => res.status(status).json(data), req.params.id);
})

// router.get('/policeman/delete/:id', (req, res) => {
//   DAL.deletePoliceman(data => res.json(data), req.params.id)
// })

module.exports = router;