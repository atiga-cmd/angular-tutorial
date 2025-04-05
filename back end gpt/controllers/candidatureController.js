/*const db = require('../config/db');

// Ajouter une candidature
exports.createCandidature = (req, res) => {
    const { id_candidat, id_offre } = req.body;

    if (!id_candidat || !id_offre) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Vérifier si la candidature existe déjà
    const checkSql = "SELECT * FROM Candidature WHERE id_candidat = ? AND id_offre = ?";
    db.query(checkSql, [id_candidat, id_offre], (err, result) => {
        if (err) {
            console.error("Erreur lors de la vérification de la candidature :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        if (result.length > 0) {
            return res.status(400).json({ error: "Vous avez déjà postulé à cette offre." });
        }

        // Insérer la candidature si elle n'existe pas encore
        const sql = "INSERT INTO Candidature (id_candidat, id_offre, date) VALUES (?, ?, NOW())";
        db.query(sql, [id_candidat, id_offre], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'ajout de la candidature :", err);
                return res.status(500).json({ error: "Erreur interne du serveur" });
            }
            res.status(201).json({ message: "✅ Candidature enregistrée avec succès !" });
        });
    });
};

// Récupérer toutes les candidatures avec détails
exports.getAllCandidatures = (req, res) => {
    const sql = `
        SELECT Candidature.*, 
               Candidat.nomCand, Candidat.prenomCand, 
               Offre.nomESE, Offre.typePoste 
        FROM Candidature
        JOIN Candidat ON Candidature.id_candidat = Candidat.id_candidat
        JOIN Offre ON Candidature.id_offre = Offre.id_offre
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des candidatures :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        res.json(results);
    });
};

// Récupérer une candidature par ID avec détails
exports.getCandidatureById = (req, res) => {
    const sql = `
        SELECT Candidature.*, 
               Candidat.nomCand, Candidat.prenomCand, 
               Offre.nomESE, Offre.typePoste 
        FROM Candidature
        JOIN Candidat ON Candidature.id_candidat = Candidat.id_candidat
        JOIN Offre ON Candidature.id_offre = Offre.id_offre
        WHERE Candidature.id_candidature = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de la candidature :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Candidature non trouvée." });
        }
        res.json(result[0]);
    });
};

// Supprimer une candidature
exports.deleteCandidature = (req, res) => {
    db.query("DELETE FROM Candidature WHERE id_candidature = ?", [req.params.id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de la candidature :", err);
            return res.status(500).json({ error: "Erreur interne du serveur" });
        }
        res.json({ message: "🗑️ Candidature supprimée avec succès !" });
    });
};
*/
// backend/controllers/CandidatureController.js
const db = require('../config/db');

// Postuler à une offre
exports.postulerOffre = (req, res) => {
  const { id_candidat, id_offre } = req.body;
  const date = new Date();

  const sql = `
    INSERT INTO Candidature (id_candidat, id_offre, date)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [id_candidat, id_offre, date], (err, result) => {
    if (err) {
      console.error('Erreur postulation:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(201).json({ message: 'Postulation réussie' });
  });
};

// Voir toutes ses candidatures
exports.getCandidaturesByCandidat = (req, res) => {
  const id_candidat = req.params.id_candidat;

  const sql = `
    SELECT c.id_candidature, c.date, o.nomESE, o.typePoste, o.domaine
    FROM Candidature c
    JOIN Offre o ON c.id_offre = o.id_offre
    WHERE c.id_candidat = ?
  `;

  db.query(sql, [id_candidat], (err, result) => {
    if (err) {
      console.error('Erreur récupération candidatures:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(200).json(result);
  });
};

// Supprimer une candidature
exports.deleteCandidature = (req, res) => {
  const id_candidature = req.params.id_candidature;

  const sql = 'DELETE FROM Candidature WHERE id_candidature = ?';
  db.query(sql, [id_candidature], (err, result) => {
    if (err) {
      console.error('Erreur suppression candidature:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(200).json({ message: 'Candidature supprimée' });
  });
};
