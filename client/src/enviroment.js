// src/environment.js

const apiUrl = process.env.REACT_APP_API_URL;
// Define otras variables de entorno que necesites aquí

// Puedes exportar cada variable individualmente
export { apiUrl };

// O, si tienes múltiples variables, puedes exportarlas todas juntas
export const environment = {
  apiUrl,
  // Añade otras variables aquí
};
