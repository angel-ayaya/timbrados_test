//nominasModel.js
const pool = require("./../db");

/*Se obtiene la nomina de un empleado mediante:
 * numero de empleado : numempleado
 * año de la nomina : anio
 * tipo de nomina : nomina
 */
const getNomina = async (numempleado, anio, nomina) => {
  const queryBody = `modulo, anio, ciclo, perext, folio, mespago, foliofiscal, totalimpret, totgravado, totexento, totpercep, totdeducc, subtotal, nombre, numempleado, rfcre, lcurp, nomina`;
  const query = `SELECT ${queryBody} FROM timbrado2017 WHERE numempleado = $1 AND anio = $2 AND nomina = $3 order by CICLO,mespago;`;

  try {
    const result = await pool.query(query, [numempleado, anio, nomina]);

    return result.rows;
  } catch (err) {
    console.error(err);
    throw err; // Considera manejar este error de manera que no rompa tu aplicación.
  }
};

const getSumNomina = async (numempleado, anio, nomina) => {
  const quertBody = `SUM(totalimpret), SUM(totgravado), SUM(totexento), SUM(totpercep), SUM(totdeducc), SUM(subtotal)`;
  const query = `
  SELECT 
    SUM(totalimpret) AS totalimpret, 
    SUM(totgravado) AS totgravado, 
    SUM(totexento) AS totexento, 
    SUM(totpercep) AS totpercep, 
    SUM(totdeducc) AS totdeducc,
    SUM(subtotal) AS subtotal
  FROM timbrado2017
  WHERE numempleado = $1 AND anio = $2 AND nomina = $3;
`;
  try {
    const valores = [numempleado, anio, nomina];
    const result = await pool.query(query, valores);
    const sumas = result.rows[0];
  
    return result.rows;
  } catch (err) {
    //   try {
    //     const result = await pool.query(query, [numempleado, anio, nomina]);
    //     sumas = result.rows[0];
    //     console.log(sumas.totalimpre);
    //     return result.rows;
    //   }
    console.error(err);
    throw err;
  }
};

module.exports = {
  getNomina,
  getSumNomina,
};
