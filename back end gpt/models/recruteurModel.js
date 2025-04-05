const db = require('../config/db');

const Recruteur = {
    create: (data, callback) => {
        const sql = "INSERT INTO Recruteur (nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [data.nom, data.prenom, data.email, data.password, data.poste, data.entreprise], callback);
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM Recruteur";
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = "SELECT * FROM Recruteur WHERE id_rec = ?";
        db.query(sql, [id], callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM Recruteur WHERE id_rec = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Recruteur;