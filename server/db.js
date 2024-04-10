const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Realizar una consulta simple para validar la conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    // Aquí podrías lanzar un error o manejar la situación de error como mejor te parezca
    // Por ejemplo, podrías terminar el proceso si es crítico que tu aplicación se conecte a la DB al inicio
    process.exit(1);
  } else {
    console.log('Conexión a la base de datos establecida exitosamente:', res.rows[0]);
  }
});

module.exports = pool;
