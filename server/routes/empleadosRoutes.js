// empleadosRoutes.js
const express = require('express');
const router = express.Router();
const empleadosModel = require('./../models/empleadosModel');

router.get('/', async (req, res) => {
  try {
    const empleados = await empleadosModel.getEmpleados2017();
    res.json(empleados);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;