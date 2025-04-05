const Admin = require('../models/adminModel');

exports.getAll = (req, res) => {
    Admin.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.getById = (req, res) => {
    Admin.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.create = (req, res) => {
    const newAdmin = req.body;
    Admin.create(newAdmin, (err, result) => {
        if (err) return res.status(500).send(err
        );
        res.status(201).json({ message: 'Admin créé avec succès', id: result.insertId });
    });
};

exports.delete = (req, res) => {
    Admin.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Admin supprimé avec succès' });
    });
};
