// app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Habilitar CORS para todas las solicitudes
app.use(cors());

const empleadosRoutes = require('./routes/empleadosRoutes');
const nominasRoutes = require('./routes/nominasRoutes');


// Middleware
app.use(express.json());

// Ruta de ejemplo
// Aquí montas tus rutas
// app.use('/api', empleadosRoutes);
app.use('/api', nominasRoutes);


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});