const db = require('../config/db');

const Candidature = {
    create: (data, callback) => {
        const sql = "INSERT INTO Candidature (id_candidat, id_offre, date) VALUES (?, ?, NOW())";
        db.query(sql, [data.id_candidat, data.id_offre], callback);
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM Candidature";
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = "SELECT * FROM Candidature WHERE id_candidature = ?";
        db.query(sql, [id], callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM Candidature WHERE id_candidature = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Candidature;
