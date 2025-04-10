
// backend/controllers/CandidatureController.js
const db = require('../config/db');

// Postuler à une offre
exports.postulerOffre = async (req, res) => {
  try {
    const { id_candidat, id_offre } = req.body;
    const date = new Date();

    const sql = `
      INSERT INTO Candidature (id_candidat, id_offre, date)
      VALUES (?, ?, ?)
    `;
    await db.query(sql, [id_candidat, id_offre, date]);
    res.status(201).json({ message: 'Postulation réussie' });
  } catch (err) {
    console.error('Erreur postulation:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Voir toutes les candidatures
exports.getAllCandidatures = async (req, res) => {
  try {
    const sql = `
      SELECT * FROM Candidature
    `;
    const [result] = await db.query(sql);
    res.status(200).json(result);
  } catch (err) {
    console.error('Erreur récupération candidatures:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Voir une candidature par ID
exports.getCandidatureById = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT * FROM Candidature WHERE id_candidature = ?
    `;
    const [result] = await db.query(sql, [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Candidature non trouvée' });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    console.error('Erreur récupération candidature:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Voir candidatures par ID de candidat
exports.getCandidaturesByCandidatId = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT c.id_candidature, c.date, o.nomESE, o.typePoste, o.domaine
      FROM Candidature c
      JOIN Offre o ON c.id_offre = o.id_offre
      WHERE c.id_candidat = ?
    `;
    const [result] = await db.query(sql, [id]);
    res.status(200).json(result);
  } catch (err) {
    console.error('Erreur récupération candidatures par candidat:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer une candidature
exports.deleteCandidature = async (req, res) => {
  try {
    const id_candidature = req.params.id_candidature;
    const sql = `
      DELETE FROM Candidature WHERE id_candidature = ?
    `;
    await db.query(sql, [id_candidature]);
    res.status(200).json({ message: 'Candidature supprimée' });
  } catch (err) {
    console.error('Erreur suppression candidature:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
