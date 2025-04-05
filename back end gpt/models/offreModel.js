const db = require('../config/db');

const Offre = {
    create: (data, callback) => {
        const sql = "INSERT INTO Offre (nomESE, local, typePoste, missions, competences, domaine, salaire, datePublication, statut, id_rec) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'ouverte', ?)";
        db.query(sql, [data.nomESE, data.local, data.typePoste, data.missions, data.competences, data.domaine, data.salaire, data.id_rec], callback);
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM Offre";
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = "SELECT * FROM Offre WHERE id_offre = ?";
        db.query(sql, [id], callback);
    },

    update: (id, data, callback) => {
        const sql = "UPDATE Offre SET nomESE = ?, local = ?, typePoste = ?, missions = ?, competences = ?, domaine = ?, salaire = ? WHERE id_offre = ?";
        db.query(sql, [data.nomESE, data.local, data.typePoste, data.missions, data.competences, data.domaine, data.salaire, id], callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM Offre WHERE id_offre = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Offre;
