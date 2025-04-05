/*
const Candidat = require('../models/candidatModel');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
    const { nom, prenom, email, password } = req.body;

    if (!nom || !prenom || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis !" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors du hashage du mot de passe" });
        }

        Candidat.create({ nom, prenom, email, password: hash }, (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Erreur lors de l'ajout", error });
            }
            res.status(201).json({ message: "Candidat ajouté avec succès !" });
        });
    });
};

exports.getAll = (req, res) => {
    Candidat.getAll((error, results) => {
        if (error) {
            return res.status(500).json({ message: "Erreur de récupération", error });
        }
        res.status(200).json(results);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;

    Candidat.getById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Erreur", error });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Candidat non trouvé" });
        }
        res.status(200).json(result[0]);
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Candidat.delete(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Erreur lors de la suppression", error });
        }
        res.status(200).json({ message: "Candidat supprimé avec succès !" });
    });
};
*/const db = require('../config/db');

// Ajouter un candidat
exports.create = (req, res) => {
    const { nom, prenom, email, motDePasse } = req.body;

    if (!nom || !prenom || !email || !motDePasse) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires !" });
    }

    const query = "INSERT INTO candidat (nomCand, prenomCand, emailCand, motPasse_cand) VALUES (?, ?, ?, ?)";

    db.query(query, [nom, prenom, email, motDePasse], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'ajout", error: err });
        }
        res.status(201).json({ message: "Candidat ajouté avec succès !" });
    });
};
// Récupérer tous les candidats
exports.getAll = (req, res) => {
    db.query("SELECT * FROM candidat", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }
        res.json(results);
    });
};

// Récupérer un candidat par ID
exports.getById = (req, res) => {
    db.query("SELECT * FROM candidat WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Candidat non trouvé" });
        }
        res.json(result[0]);
    });
};

// Supprimer un candidat
exports.delete = (req, res) => {
    db.query("DELETE FROM candidat WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }
        res.json({ message: "Candidat supprimé avec succès !" });
    });
};
