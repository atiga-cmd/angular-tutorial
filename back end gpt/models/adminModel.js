const db = require('../config/db');

const Admin = {
    getAll: (callback) => {
        db.query('SELECT * FROM Admin', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM Admin WHERE id_admin = ?', [id], callback);
    },
    create: (admin, callback) => {
        db.query('INSERT INTO Admin SET ?', admin, callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Admin WHERE id_admin = ?', [id], callback);
    }
};

module.exports = Admin;
