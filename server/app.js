// app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Habilitar CORS para todas las solicitudes
app.use(cors());

const nominasRoutes = require('./routes/nominasRoutes');
const authRoutes = require('./routes/authRoutes');


// Middleware
app.use(express.json());

// Ruta de ejemplo
// Aquí montas tus rutas

app.use('/api', nominasRoutes);
app.use('/api/auth', authRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});