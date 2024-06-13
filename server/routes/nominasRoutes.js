// nominasRoutes.js
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const { getNomina, subirNuevosTimbrados, getTiposNomina } = require("../models/nominasModel"); // Asegúrate de que la ruta sea correcta

// Asumiendo que tus parámetros se pasan en la URL de esta forma: /nominas/:numempleado/:anio/:nomina
router.get(
  "/nominas/:numempleado/:anio/:nomina",
  verifyToken,
  async (req, res) => {
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
  }
);

/**
 * Obtener nóminas de la tabla tipos_nomina
 */
router.get("/nominas/tipos", async (req, res) => {
  try {
    const tiposNomina = await getTiposNomina();
    res.json(tiposNomina);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error del servidor");
  }  
});

// Actualizar datos de la tabla timbrados2017 con datos de un json
router.post("/nominas/carga", verifyToken, async (req, res) => {
  try {
    const registros = req.body;

    // Lógica para actualizar la base de datos
    await subirNuevosTimbrados(registros);

    res.json({ message: "Datos actualizados correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;
