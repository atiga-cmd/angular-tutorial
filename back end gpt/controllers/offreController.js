/*const db = require('../config/db');

// Ajouter une offre
exports.createOffre = (req, res) => {
    const { nomESE, local, typePoste, missions, competences, domaine, salaire, id_rec } = req.body;

    if (!nomESE || !local || !typePoste || !missions || !competences || !domaine || !salaire || !id_rec) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const sql = "INSERT INTO Offre (nomESE, local, typePoste, missions, competences, domaine, salaire, datePublication, statut, id_rec) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'ouverte', ?)";
    
    db.query(sql, [nomESE, local, typePoste, missions, competences, domaine, salaire, id_rec], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'ajout de l'offre :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        res.status(201).json({ message: "✅ Offre ajoutée avec succès !" });
    });
};

// Récupérer toutes les offres avec détails du recruteur
exports.getAllOffres = (req, res) => {
    const sql = `
        SELECT Offre.*, Recruteur.nomRec, Recruteur.prenomRec, Recruteur.entreprise 
        FROM Offre
        JOIN Recruteur ON Offre.id_rec = Recruteur.id_rec
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des offres :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        res.json(results);
    });
};

// Récupérer une offre par ID avec les détails du recruteur
exports.getOffreById = (req, res) => {
    const sql = `
        SELECT Offre.*, Recruteur.nomRec, Recruteur.prenomRec, Recruteur.entreprise 
        FROM Offre
        JOIN Recruteur ON Offre.id_rec = Recruteur.id_rec
        WHERE Offre.id_offre = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de l'offre :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Offre non trouvée." });
        }
        res.json(result[0]);
    });
};

// Modifier une offre
exports.updateOffre = (req, res) => {
    const { nomESE, local, typePoste, missions, competences, domaine, salaire } = req.body;

    if (!nomESE || !local || !typePoste || !missions || !competences || !domaine || !salaire) {
        return res.status(400).json({ error: "Tous les champs sont requis pour la mise à jour." });
    }

    const sql = `
        UPDATE Offre 
        SET nomESE = ?, local = ?, typePoste = ?, missions = ?, competences = ?, domaine = ?, salaire = ? 
        WHERE id_offre = ?
    `;

    db.query(sql, [nomESE, local, typePoste, missions, competences, domaine, salaire, req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de l'offre :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Offre non trouvée." });
        }
        res.json({ message: "✏️ Offre mise à jour avec succès !" });
    });
};

// Supprimer une offre
exports.deleteOffre = (req, res) => {
    db.query("DELETE FROM Offre WHERE id_offre = ?", [req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'offre :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Offre non trouvée." });
        }
        res.json({ message: "🗑️ Offre supprimée avec succès !" });
    });
};
*/
const db = require('../config/db');
// Ajouter une nouvelle offre
exports.ajouterOffre = async (req, res) => {
    const {
        nomESE, local, typePoste, missions,
        competences, domaine, salaire,
        datePublication, statut, id_rec
    } = req.body;

    // Vérification des champs obligatoires
    if (!nomESE || !local || !typePoste || !missions || !competences || !domaine || !salaire || !datePublication || !statut || !id_rec) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const sql = `
        INSERT INTO Offre (nomESE, local, typePoste, missions, competences, domaine, salaire, datePublication, statut, id_rec)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [nomESE, local, typePoste, missions, competences, domaine, salaire, datePublication, statut, id_rec];

    try {
        const [result] = await db.query(sql, values);
        res.status(201).json({ message: 'Offre ajoutée avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de l\'offre:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupérer toutes les offres
exports.getOffres = async (req, res) => {
    const sql = 'SELECT * FROM Offre';
    try {
        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error('Erreur lors de la récupération des offres :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer une offre
exports.deleteOffre = async (req, res) => {
    const id_offre = req.params.id_offre;

    const sql = 'DELETE FROM Offre WHERE id_offre = ?';
    try {
        const [result] = await db.query(sql, [id_offre]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Offre non trouvée' });
        }
        res.status(200).json({ message: 'Offre supprimée' });
    } catch (err) {
        console.error('Erreur suppression offre:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};
