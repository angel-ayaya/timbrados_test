import React, { useState, useEffect } from "react";
import { apiUrl } from "../../enviroment";
import Header from "../Header";
import "./index.css";

const TablaNominas = () => {
  const [nominas, setNominas] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [numEmpleado, setNumEmpleado] = useState("");
  const [anio, setAnio] = useState("");
  const [nomina, setNomina] = useState("");

  const fetchNominas = () => {
    setCargando(true);
    const url = `${apiUrl}/api/nominas/${numEmpleado}/${anio}/${nomina}`;
    console.log(url);
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
      <div className="w-[50vw] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center my-6 items-center"
        >
          <div className="mb-4 px-2">
            <label htmlFor="">Número de empleado</label>
            <input
              type="text"
              value={numEmpleado}
              onChange={(e) => setNumEmpleado(e.target.value)}
              placeholder=""
              className="form-input mt-1 block w-full border-gray-300 border shadow-sm rounded-md p-2"
            />
          </div>
          <div className="mb-4 px-2">
            <label htmlFor="">Año</label>
            <input
              type="text"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              placeholder=""
              className="form-input mt-1 block w-full border-gray-300 border shadow-sm rounded-md p-2"
            />
          </div>
          <div className="mb-4 px-2">
            <label
              htmlFor="tipoNomina"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Nómina
            </label>
            <select
              id="tipoNomina"
              value={nomina}
              onChange={(e) => setNomina(e.target.value)}
              className="mt-1 block w-full border border-gray-300 bg-white py-2 px-3 shadow-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un tipo</option>
              <option value="1">1 - Burocracia</option>
              <option value="2">2 - Magisterio</option>
              <option value="3">3 - Normal Urbana</option>
              <option value="4">4 - Jubilados Burocracia</option>
              <option value="8">8 - Contratos</option>
              <option value="9">9 - Jubilados Magisterio</option>
              <option value="11">11 - Fondo Pensión Burocracia</option>
              <option value="12">12 - Fondo Pensión Magisterio</option>
              <option value="24">24 - Magisterio Federalizado</option>
              <option value="25">25 - Telebachillerato</option>
              <option value="26">26 - Telebachillerato Contratos</option>
              <option value="28">28 - Centro de Control de Confianza</option>
              <option value="50">50 - Contratos Infraestructura</option>
              <option value="57">57 - Contratos 5 al Millar</option>
              <option value="88">88 - Contratos D</option>
              <option value="61">61 - Infraestructura</option>
              <option value="60">60 - FOFAE</option>
              <option value="63">63 - Servicio Nacional de Empleo</option>
              {/* Añade más opciones según sea necesario */}
            </select>
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
        <Header nominas={nominas} />
        {cargando ? (
          <div className="text-center">Cargando...</div>
        ) : nominas ? (
          <div className="w-full flex justify-center">
            <table className="table-auto">
              <thead>
                <tr className="border-2">
                  <th className="bg-gray-300 text-center px-2">Mod</th>
                  <th className="bg-gray-300 text-center px-2">Año</th>
                  <th className="bg-gray-300 text-center px-2">Ciclo</th>
                  <th className="bg-gray-300 text-center px-2">Perext</th>
                  <th className="bg-gray-300 text-center px-2">Folio</th>
                  <th className="bg-gray-300 text-center px-2">Mes</th>
                  <th className="bg-gray-300 text-center px-2">Folio Fiscal</th>
                  <th className="bg-gray-300 text-center ">ISR Retenido</th>
                  <th className="bg-gray-300 text-center px-2">Gravados</th>
                  <th className="bg-gray-300 text-center px-2">Exentos</th>
                  <th className="bg-gray-300 text-center px-2">Percepciones</th>
                  <th className="bg-gray-300 text-center px-2">Deducciones</th>
                  <th className="bg-gray-300 text-center px-2">Total Neto</th>
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
                <tr className="text-center border-2 font-bold">
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
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">No hay datos</div>
        )}
      </div>
      <div className="w-full flex justify-center my-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          onClick={() => window.print()}
        >
          Imprimir esta página
        </button>
      </div>
    </div>
  );
};

export default TablaNominas;
