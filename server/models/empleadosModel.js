// empleadosModel.js
const pool = require('./../db');

const getEmpleados2017 = async () => {
  const query = "SELECT * FROM empleados2017 where numempleado = '5797'";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getEmpleados2017,
};