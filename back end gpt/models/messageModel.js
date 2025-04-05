
const db = require('../config/db');

const Message = {
    create: (data, callback) => {
        const sql = "INSERT INTO Message (id_candidat, id_rec, contenu, date, statut) VALUES (?, ?, ?, NOW(), 'non lu')";
        db.query(sql, [data.id_candidat, data.id_rec, data.contenu], callback);
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM Message";
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = "SELECT * FROM Message WHERE id_message = ?";
        db.query(sql, [id], callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM Message WHERE id_message = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Message;
