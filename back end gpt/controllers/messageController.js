const db = require('../config/db');

// Ajouter un message
exports.createMessage = (req, res) => {
    const { id_candidat, id_rec, contenu } = req.body;

    if (!id_candidat || !id_rec || !contenu) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const sql = "INSERT INTO Message (id_candidat, id_rec, contenu, date, statut) VALUES (?, ?, ?, NOW(), 'non lu')";
    
    db.query(sql, [id_candidat, id_rec, contenu], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'envoi du message :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        res.status(201).json({ message: "Message envoyé avec succès !" });
    });
};

// Récupérer tous les messages avec noms des utilisateurs
exports.getAllMessages = (req, res) => {
    const sql = `
        SELECT Message.*, Candidat.nomCand, Candidat.prenomCand, Recruteur.nomRec, Recruteur.prenomRec
        FROM Message
        JOIN Candidat ON Message.id_candidat = Candidat.id_candidat
        JOIN Recruteur ON Message.id_rec = Recruteur.id_rec
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des messages :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        res.json(results);
    });
};

// Récupérer un message par ID avec détails
exports.getMessageById = (req, res) => {
    const sql = `
        SELECT Message.*, Candidat.nomCand, Candidat.prenomCand, Recruteur.nomRec, Recruteur.prenomRec
        FROM Message
        JOIN Candidat ON Message.id_candidat = Candidat.id_candidat
        JOIN Recruteur ON Message.id_rec = Recruteur.id_rec
        WHERE Message.id_message = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération du message :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Message non trouvé." });
        }
        res.json(result[0]);
    });
};

// Supprimer un message
exports.deleteMessage = (req, res) => {
    db.query("DELETE FROM Message WHERE id_message = ?", [req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression du message :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        res.json({ message: "Message supprimé avec succès !" });
    });
};
