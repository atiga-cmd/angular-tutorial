const jwt = require('jsonwebtoken');
require('dotenv').config(); // Charge les variables d'environnement depuis .env

const user = { id: 1, email: "test@example.com" };
const secretKey = process.env.JWT_SECRET || "a-string-secret-at-least-256-bits-long";

const token = jwt.sign(user, secretKey, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

console.log("🔑 Ton nouveau token :", token);
