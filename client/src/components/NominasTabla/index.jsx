import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../enviroment";
import Header from "../Header";
import "./index.css";

const TablasNominas = () => {
  const [nominas, setNominas] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [numEmpleado, setNumEmpleado] = useState("");
  const [anio, setAnio] = useState("");
  const [nomina, setNomina] = useState("");
  const [tiposNomina, setTiposNomina] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTiposNomina();
  }, []);

  const fetchTiposNomina = () => {
    const url = `${apiUrl}/api/nominas/tipos`;
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token available");
      navigate("/login");
      return;
    }

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTiposNomina(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (
          error.message.includes("Forbidden") ||
          error.message.includes("Unauthorized") ||
          error.message.includes("403")
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
      });
  };

  const fetchNominas = () => {
    setCargando(true);
    const url = `${apiUrl}/api/nominas/${numEmpleado}/${anio}/${nomina}`;
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token available");
      setCargando(false);
      navigate("/login");
      return;
    }

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized: Redirecting to login.");
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNominas(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCargando(false);
        if (
          error.message.includes("Forbidden") ||
          error.message.includes("Unauthorized") ||
          error.message.includes("403")
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNominas(null);
    fetchNominas();
  };

  // Determinar si es nómina especial (1 o 12) y año 2024
const esNominaEspecial = nominas && nominas.some(n => 
  (n.nomina === 1 || n.nomina === 11) && n.anio === 2024
);

// Filtrar datos
const filteredNominas = nominas 
  ? esNominaEspecial
    ? nominas.filter(n => !(n.ciclo === 24 && n.perext === 2)) // Excluir para nóminas 1/12 en 2024
    : [...nominas] // Mostrar todo para otros casos
  : [];

// Datos excluidos (solo para nóminas 1/12 en 2024)
const excluidos = nominas && esNominaEspecial 
  ? nominas.filter(n => n.ciclo === 24 && n.perext === 2) 
  : [];

  // Calcular totales para la tabla principal
  const totalImporteRet = filteredNominas
    .reduce((acc, curr) => acc + Number(curr.totalimpret || 0), 0);
  const totalGravado = filteredNominas
    .reduce((acc, curr) => acc + Number(curr.totgravado || 0), 0);
  const totalExento = filteredNominas
    .reduce((acc, curr) => acc + Number(curr.totexento || 0), 0);
  const totalPercepciones = filteredNominas
    .reduce((acc, curr) => acc + Number(curr.totpercep || 0), 0);
  const totalDeducciones = filteredNominas
    .reduce((acc, curr) => acc + Number(curr.totdeducc || 0), 0);
  const subtotal = filteredNominas
    .reduce((acc, curr) => acc + Number(curr.subtotal || 0), 0);
  const totalNeto = subtotal - totalDeducciones;

  // Calcular totales para los excluidos (solo para nóminas 1 y 12)
  const totalImporteRet1 = excluidos
    .reduce((acc, curr) => acc + Number(curr.totalimpret || 0), 0);
  const totalGravado1 = excluidos
    .reduce((acc, curr) => acc + Number(curr.totgravado || 0), 0);
  const totalExento1 = excluidos
    .reduce((acc, curr) => acc + Number(curr.totexento || 0), 0);
  const totalPercepciones1 = excluidos
    .reduce((acc, curr) => acc + Number(curr.totpercep || 0), 0);
  const totalDeducciones1 = excluidos
    .reduce((acc, curr) => acc + Number(curr.totdeducc || 0), 0);
  const subtotal1 = excluidos
    .reduce((acc, curr) => acc + Number(curr.subtotal || 0), 0);
  const totalNeto1 = subtotal1 - totalDeducciones1;

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
              required
            >
              <option value="">Seleccione un tipo</option>
              {tiposNomina.map((nomina) => (
                <option key={nomina.id} value={nomina.numero}>
                 {nomina.numero} - {nomina.tipo}
                </option>
              ))}
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

      <div className="media-wrapper">
        <Header nominas={nominas} />
        {cargando ? (
          <div className="text-center">Cargando...</div>
        ) : nominas ? (
          <>
            {/* Tabla Principal */}
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
                  {filteredNominas.map((nomina, index) => (
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

            <center style={{ marginTop: "20px" }}>
              <h2><strong></strong></h2>
            </center>

            {/* Tabla de Excluidos (solo para nóminas 1 y 12) */}
            {esNominaEspecial && excluidos.length > 0 && (
              <div className="w-full flex flex-col items-center mt-8">
              <h3 className="text-center mb-4 font-bold">El fondo de ahorro retenido a los trabajadores en 2024 se registró bajo el concepto de "Otros Pagos", 
                en cumplimiento de la normativa fiscal vigente, por lo que no constituye un ingreso acumulable para efectos de 
                la autoridad fiscal.</h3>
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
                    {excluidos.map((nomina, index) => (
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
                      <td className="bg-gray-300">{totalImporteRet1.toFixed(2)}</td>
                      <td className="bg-gray-300">{totalGravado1.toFixed(2)}</td>
                      <td className="bg-gray-300">{totalExento1.toFixed(2)}</td>
                      <td className="bg-gray-300">
                        {totalPercepciones1.toFixed(2)}
                      </td>
                      <td className="bg-gray-300">{totalDeducciones1.toFixed(2)}</td>
                      <td className="bg-gray-300">{totalNeto1.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
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

export default TablasNominas;