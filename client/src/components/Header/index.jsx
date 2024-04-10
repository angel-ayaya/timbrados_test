const Header = ({ nominas }) => {
  const fechaActual = new Date().toLocaleString(); // Obtener la fecha y hora actuales
  return (
    <div className="text-center w-[50vw] mb-2 header-wrapper mx-auto">
      <h1 className="text-3xl">
        Reporte de timbrado para el ejercicio{" "}
        {nominas && nominas[0] ? nominas[0].anio : ""}
      </h1>
      <h2 className="text-xl">
        Nombre: {nominas && nominas[0] ? nominas[0].nombre : ""}
      </h2>
      <div className="flex justify-between">
        <h2 className="text-lg">
          Número de empleado:{" "}
          {nominas && nominas[0] ? nominas[0].numempleado : ""}
        </h2>
        <h2 className="text-lg">
          RFC: {nominas && nominas[0] ? nominas[0].rfcre : ""}
        </h2>
      </div>
      <div className="flex w-full justify-between">
        <h2 className="text-lg ">
          CURP: {nominas && nominas[0] ? nominas[0].lcurp : ""}
        </h2>
        <h2 className="text-lg px-2">
          NÓMINA: {nominas && nominas[0] ? nominas[0].nomina : ""}
        </h2>
      </div>
      {/* Agregar fecha y hora de la consulta */}
      <h2 className="text-lg">Fecha de consulta: {fechaActual}</h2>
    </div>
  );
};

export default Header;
