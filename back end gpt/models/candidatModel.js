const db = require('../config/db');

const Candidat = {
    create: (data, callback) => {
        const sql = "INSERT INTO Candidat (nomCand, prenomCand, emailCand, motPasse_cand) VALUES (?, ?, ?, ?)";
        db.query(sql, [data.nom, data.prenom, data.email, data.password], callback);
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM Candidat";
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = "SELECT * FROM Candidat WHERE id_candidat = ?";
        db.query(sql, [id], callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM Candidat WHERE id_candidat = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Candidat;