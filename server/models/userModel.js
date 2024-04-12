const pool = require("../db");
const bcrypt = require("bcryptjs");

const findUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
};

const createUser = async (username, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hashear la contraseña antes de guardarla
  const { rows } = await pool.query(
    "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
    [username, hashedPassword, email]
  );
  return rows[0];
};

const comparePassword = async (candidatePassword, hash) => {
  return bcrypt.compare(candidatePassword, hash);
};

module.exports = {
  findUserByUsername,
  createUser,
  comparePassword
};