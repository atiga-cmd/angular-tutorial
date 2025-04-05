/*
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');
require('dotenv').config(); // Charger les variables d'environnement

// Générer un token JWT valide avec .env
const user = { id: 1, email: "test@example.com" };
const secretKey = process.env.JWT_SECRET || "a-string-secret-at-least-256-bits-long";

const token = jwt.sign(user, secretKey, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

console.log("🔑 Ton nouveau token :", token);

// Inscription d'un candidat
exports.registerCandidat = (req, res) => {
    const { nomCand, prenomCand, emailCand, motPasse_cand } = req.body;

    if (!nomCand || !prenomCand || !emailCand || !motPasse_cand) {
        return res.status(400).json({ message: "جميع الحقول مطلوبة!" });
    }

    bcrypt.hash(motPasse_cand, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors du hachage du mot de passe", error: err });
        }

        const sql = "INSERT INTO Candidat (nomCand, prenomCand, emailCand, motPasse_cand) VALUES (?, ?, ?, ?)";
        db.query(sql, [nomCand, prenomCand, emailCand, hash], (err, result) => {
            if (err) {
                console.error("Erreur SQL:", err);
                return res.status(500).json({ message: "Erreur lors de l'inscription", error: err });
            }
            res.status(201).json({ message: "✅ Candidat inscrit avec succès !" });
        });
    });
};

// Connexion d'un candidat
exports.loginCandidat = (req, res) => {
    const { emailCand, motPasse_cand } = req.body;

    if (!emailCand || !motPasse_cand) {
        return res.status(400).json({ message: "جميع الحقول مطلوبة!" });
    }

    const sql = "SELECT * FROM Candidat WHERE emailCand = ?";
    db.query(sql, [emailCand], (err, results) => {
        if (err) {
            console.error("Erreur SQL:", err);
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!" });
        }

        const candidat = results[0];

        bcrypt.compare(motPasse_cand, candidat.motPasse_cand, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ message: "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!" });
            }

            // 🔥 Correction : Utilisation correcte de process.env.JWT_SECRET et process.env.JWT_EXPIRES_IN
            const token = jwt.sign(
                { id: candidat.id_candidat, email: candidat.emailCand }, 
                process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
            );

            res.status(200).json({ message: "✅ تسجيل الدخول ناجح!", token });
        });
    });
};*/
////////////////////
const db = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        console.log("➡️ Tentative de connexion avec :", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        // Vérifier si l'utilisateur existe
        const [rows] = await db.promise().query(`SELECT * FROM candidat WHERE email = ?`, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Email incorrect" });
        }

        const user = rows[0];
        console.log("✅ Utilisateur trouvé:", user);

        // Vérification du mot de passe
        if (user.password !== password) { 
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ message: "Connexion réussie !", token, user });
    } catch (error) {
        console.error("❌ Erreur serveur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
