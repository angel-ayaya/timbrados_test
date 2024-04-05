import React, { useState, useEffect } from "react";
import "./index.css";

const TablaNominas = () => {
  const [nominas, setNominas] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [numEmpleado, setNumEmpleado] = useState("");
  const [anio, setAnio] = useState("");
  const [nomina, setNomina] = useState("");

  const fetchNominas = () => {
    setCargando(true);
    const url = `http://localhost:3001/api/nominas/${numEmpleado}/${anio}/${nomina}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setNominas(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCargando(false);
      });
  };

  // Esta función se llama cuando el formulario se envía.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el envío predeterminado del formulario
    setNominas(null); // Limpiar los datos de nominas
    fetchNominas(); // Llamar a fetchNominas para actualizar los datos según la entrada del usuario
  };

  const totalImporteRet = nominas
    ? nominas.reduce((acc, curr) => acc + Number(curr.totalimpret || 0), 0)
    : 0;
  const totalGravado = nominas
    ? nominas.reduce((acc, curr) => acc + Number(curr.totgravado || 0), 0)
    : 0;
  const totalExento = nominas
    ? nominas.reduce((acc, curr) => acc + Number(curr.totexento || 0), 0)
    : 0;
  const totalPercepciones = nominas
    ? nominas.reduce((acc, curr) => acc + Number(curr.totpercep || 0), 0)
    : 0;
  const totalDeducciones = nominas
    ? nominas.reduce((acc, curr) => acc + Number(curr.totdeducc || 0), 0)
    : 0;
  const subtotal = nominas
    ? nominas.reduce((acc, curr) => acc + Number(curr.subtotal || 0), 0)
    : 0;
  const totalNeto = subtotal - totalDeducciones;

  return (
    <div>
      <div>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-8">
          <div className="mb-4">
            <label htmlFor="">Número de empleado</label>
            <input
              type="text"
              value={numEmpleado}
              onChange={(e) => setNumEmpleado(e.target.value)}
              placeholder="Número de empleado"
              className="form-input mt-1 block w-full border-gray-300 shadow-sm rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="">Año</label>
            <input
              type="text"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              placeholder="Año"
              className="form-input mt-1 block w-full border-gray-300 shadow-sm rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="">Tipo de Nomina</label>
            <input
              type="text"
              value={nomina}
              onChange={(e) => setNomina(e.target.value)}
              placeholder="Tipo de nómina"
              className="form-input mt-1 block w-full border-gray-300 shadow-sm rounded-md p-2"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
      {/* Div wrapper */}
      <div className="media-wrapper">
        {/* Solo intenta acceder a `nombre` si `nominas` es un array con al menos un elemento */}
        <div className="text-center mb-2">
          <h1 className="text-xl">
            Reporte de timbrado para el ejercicio{" "}
            {nominas && nominas[0] ? nominas[0].anio : ""}
          </h1>
          <h2 className="text-lg">
            Nombre: {nominas && nominas[0] ? nominas[0].nombre : ""}
          </h2>
          <h2>
            Número de empleado:{" "}
            {nominas && nominas[0] ? nominas[0].numempleado : ""}
          </h2>
          <h2>RFC: {nominas && nominas[0] ? nominas[0].rfcre : ""}</h2>
          <h2>CURP: {nominas && nominas[0] ? nominas[0].lcurp : ""}</h2>
          <h2>NÓMINA: {nominas && nominas[0] ? nominas[0].nomina : ""}</h2>
        </div>
        {cargando ? (
          <div>Cargando...</div>
        ) : nominas ? (
          <div className="w-full flex justify-center">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="bg-gray-300 text-center">Mod</th>
                  <th className="bg-gray-300 text-center">Año</th>
                  <th className="bg-gray-300 text-center">Ciclo</th>
                  <th className="bg-gray-300 text-center">Perext</th>
                  <th className="bg-gray-300 text-center">Folio</th>
                  <th className="bg-gray-300 text-center">Mes</th>
                  <th className="bg-gray-300 text-center">Folio Fiscal</th>
                  <th className="bg-gray-300 text-center">ISR Retenido</th>
                  <th className="bg-gray-300 text-center">Gravados</th>
                  <th className="bg-gray-300 text-center">Exentos</th>
                  <th className="bg-gray-300 text-center">Percepciones</th>
                  <th className="bg-gray-300 text-center">Deducciones</th>
                  <th className="bg-gray-300 text-center">Total Neto</th>
                </tr>
              </thead>
              <tbody>
                {/* Verifica si `nominas` existe y luego mapea */}
                {nominas &&
                  nominas.map((nomina, index) => (
                    <tr className="text-center" key={index}>
                      <td className="border-2">{nomina.modulo}</td>
                      <td className="border-2">{nomina.anio}</td>
                      <td className="border-2">{nomina.ciclo}</td>
                      <td className="border-2">{nomina.perext}</td>
                      <td className="border-2">{nomina.folio}</td>
                      <td className="border-2">{nomina.mespago}</td>
                      <td className="border-2">{nomina.foliofiscal}</td>
                      <td className="border-2">{nomina.totalimpret}</td>
                      <td className="border-2">{nomina.totgravado}</td>
                      <td className="border-2">{nomina.totexento}</td>
                      <td className="border-2">{nomina.totpercep}</td>
                      <td className="border-2">{nomina.totdeducc}</td>
                      <td className="border-2">
                        {(nomina.subtotal - nomina.totdeducc).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="text-center">
                  <td className="bg-gray-300" colSpan="6"></td>
                  <td className="bg-gray-300">TOTAL</td>
                  <td className="bg-gray-300">{totalImporteRet.toFixed(2)}</td>
                  <td className="bg-gray-300">{totalGravado.toFixed(2)}</td>
                  <td className="bg-gray-300">{totalExento.toFixed(2)}</td>
                  <td className="bg-gray-300">
                    {totalPercepciones.toFixed(2)}
                  </td>
                  <td className="bg-gray-300">{totalDeducciones.toFixed(2)}</td>
                  <td className="bg-gray-300">{totalNeto.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div>No hay datos</div>
        )}
      </div>
      <div className="w-full flex justify-center my-8">
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200" onClick={() => window.print()}>Imprimir esta página</button>
      </div>
    </div>
  );
};

export default TablaNominas;
