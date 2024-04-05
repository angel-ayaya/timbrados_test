// nominasRoutes.js
const express = require("express");
const router = express.Router();
const { getNomina, getSumNomina } = require("../models/nominasModel"); // Asegúrate de que la ruta sea correcta

// Asumiendo que tus parámetros se pasan en la URL de esta forma: /nominas/:numempleado/:anio/:nomina
router.get("/nominas/:numempleado/:anio/:nomina", async (req, res) => {
  try {
    const { numempleado, anio, nomina } = req.params;
    const nominaData = await getNomina(numempleado, anio, nomina);
    if (nominaData.length) {
      res.json(nominaData);
    } else {
      res.status(404).send("Nómina no encontrada");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error del servidor");
  }
});

// Asumiendo que tus parámetros se pasan en la URL de esta forma: /nominas/sum/:numempleado/:anio/:nomina
router.get("/nominas/sum/:numempleado/:anio/:nomina", async (req, res) => {
  try {
    const { numempleado, anio, nomina } = req.params;
    const sumNominaData = await getSumNomina(numempleado, anio, nomina);
    if (sumNominaData.length) {
      res.json(sumNominaData);
    } else {
      res.status(404).send("Nómina no encontrada");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error del servidor");
  }
});


module.exports = router;
