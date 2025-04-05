const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Ajouter un recruteur
exports.createRecruteur = (req, res) => {
    const { nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise } = req.body;

    if (!nomRec || !prenomRec || !emailRec || !motPasse_rec || !poste || !entreprise) {
        return res.status(400).json({ error: "Tous les champs sont requis !" });
    }

    const sql = "INSERT INTO Recruteur (nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.status(201).json({ message: "Recruteur ajouté avec succès !" });
    });
};
// Enregistrer un recruteur
exports.registerRecruteur = (req, res) => {
    const { nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise } = req.body;

    if (!nomRec || !prenomRec || !emailRec || !motPasse_rec) {
        return res.status(400).json({ message: "Tous les champs sont requis !" });
    }

    bcrypt.hash(motPasse_rec, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });

        const sql = "INSERT INTO recruteur (nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [nomRec, prenomRec, emailRec, hash, poste, entreprise], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: "Recruteur inscrit avec succès !" });
        });
    });
};

// Connexion d'un recruteur
exports.loginRecruteur = (req, res) => {
    const { emailRec, motPasse_rec } = req.body;

    db.query("SELECT * FROM recruteur WHERE emailRec = ?", [emailRec], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(401).json({ message: "Email ou mot de passe incorrect !" });

        const recruteur = results[0];

        bcrypt.compare(motPasse_rec, recruteur.motPasse_rec, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe incorrect !" });

            const token = jwt.sign({ id: recruteur.id_rec, email: recruteur.emailRec }, process.env.JWT_SECRET, { expiresIn: "7d" });

            res.json({ message: "Connexion réussie !", token });
        });
    });
};

// Récupérer tous les recruteurs
exports.getAllRecruteurs = (req, res) => {
    db.query("SELECT * FROM recruteur", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Récupérer un recruteur par ID
exports.getRecruteurById = (req, res) => {
    db.query("SELECT * FROM recruteur WHERE id_rec = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(404).json({ message: "Recruteur non trouvé !" });
        res.json(result[0]);
    });
};

// Mettre à jour un recruteur
exports.updateRecruteur = (req, res) => {
    const { nomRec, prenomRec, emailRec, poste, entreprise } = req.body;
    db.query("UPDATE recruteur SET nomRec = ?, prenomRec = ?, emailRec = ?, poste = ?, entreprise = ? WHERE id_rec = ?", 
    [nomRec, prenomRec, emailRec, poste, entreprise, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Recruteur mis à jour avec succès !" });
    });
};

// Supprimer un recruteur
exports.deleteRecruteur = (req, res) => {
    db.query("DELETE FROM Recruteur WHERE id_rec = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Recruteur supprimé avec succès !" });
    });
};
