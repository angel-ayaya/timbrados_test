// server/routes/auth.js

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const userModel = require("../models/userModel");

// Función para generar tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "12h" }
  );
  const refreshToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findUserByUsername(username);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await userModel.comparePassword(password, user.password);
  if (isMatch) {
    const { accessToken, refreshToken } = generateTokens(user);
    res.json({ accessToken, refreshToken });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = await userModel.findUserByUsername(username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already taken" });
  }
  const newUser = await userModel.createUser(username, password, email);
  const { accessToken, refreshToken } = generateTokens(newUser);
  res.status(201).json({ accessToken, refreshToken });
});

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token is required" });
  }
  try {
    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const { accessToken, refreshToken: newRefreshToken } =
      generateTokens(userData);
    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid Refresh Token" });
  }
});

module.exports = router;
