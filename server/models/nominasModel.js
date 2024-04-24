//nominasModel.js
const pool = require("./../db");

/*Se obtiene la nomina de un empleado mediante:
 * numero de empleado : numempleado
 * año de la nomina : anio
 * tipo de nomina : nomina
 */
const table = "timbrado_new";

const getNomina = async (numempleado, anio, nomina) => {
  const queryBody = `modulo, anio, ciclo, perext, folio, mespago, foliofiscal, totalimpret, totgravado, totexento, totpercep, totdeducc, subtotal, nombre, numempleado, rfcre, lcurp, nomina`;
  const query = `SELECT ${queryBody} FROM ${table}  WHERE numempleado = $1 AND anio = $2 AND nomina = $3 order by CICLO,mespago;`;

  try {
    const result = await pool.query(query, [numempleado, anio, nomina]);

    return result.rows;
  } catch (err) {
    console.error(err);
    throw err; // Considera manejar este error de manera que no rompa tu aplicación.
  }
};

const subirNuevosTimbrados = async (registros) => {
  for (const registro of registros) {
    await pool.query(
      `INSERT INTO ${table} (repositorio, modulo, nomina, anio, ciclo, perext, numempleado, statcancela, totpercep, totdeducc, totgravado, totexento, totsueldo, tototrosded, totisr, folio, aniopago, mespago, totalimpret, basegrabada, subtotal, nombranum, nombre, key, clavenombramiento, pactimbrado, foliofiscal, rfcre, lcurp)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`,
      [
      registro.repositorio, registro.modulo, registro.nomina, registro.anio, registro.ciclo,
      registro.perext, registro.numempleado, registro.statcancela, registro.totpercep,
      registro.totdeducc, registro.totgravado, registro.totexento, registro.totsueldo,
      registro.tototrosded, registro.totisr, registro.folio, registro.aniopago, registro.mespago,
      registro.totalimpret, registro.basegrabada, registro.subtotal, registro.nombranum, registro.nombre,
      registro.key, registro.clavenombramiento, registro.pactimbrado, registro.foliofiscal, registro.rfcre,
      registro.lcurp
      ]
    );
  }
}

/* 
* Deprecated function posiblemente no se use
*/
const getSumNomina = async (numempleado, anio, nomina) => {
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
  subirNuevosTimbrados,
  getSumNomina,
};
