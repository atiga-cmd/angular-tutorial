/*
const express = require('express');
const router = express.Router();
const OffreController = require('../controllers/offreController');

// Assurez-vous que chaque fonction dans le contrôleur est bien définie
router.post('/offres', OffreController.ajouterOffre);
router.get('/offres', OffreController.getOffres);
router.delete('/supprimer/:id_offre', OffreController.deleteOffre);

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const OffreController = require('../controllers/offreController');
const db = require('../config/db'); // ✅ Important pour accéder à MySQL avec async/await



// 👀 Route : récupérer toutes les offres
router.get('/offres', OffreController.getOffres);

// 🗑️ Route : supprimer une offre
router.delete('/supprimer/:id_offre', async (req, res) => {
    const { id_offre } = req.params;
    console.log("🗑️ Route /supprimer/:id_offre appelée avec id =", id_offre);

    try {
        const [result] = await db.query('DELETE FROM Offre WHERE id_offre = ?', [id_offre]);

        if (result.affectedRows === 0) {
            console.log("⚠️ Aucune offre supprimée. L'offre n'existe peut-être pas.");
            return res.status(404).json({ message: "Offre non trouvée." });
        }

        console.log("✅ Offre supprimée avec succès.");
        res.status(200).json({ message: "Offre supprimée avec succès." });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression de l'offre :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

// ✅ 🔍 Route : afficher les offres par recruteur
router.get('/offres/recruteur/:id', async (req, res) => {
    const id_rec = req.params.id;
    console.log("🔍 Route /offres/recruteur/:id appelée avec id =", id_rec);

    try {
        const [rows] = await db.query('SELECT * FROM Offre WHERE id_rec = ?', [id_rec]);

        if (rows.length === 0) {
            console.log("⚠️ Aucune offre trouvée pour ce recruteur.");
            return res.status(404).json({ message: "Aucune offre trouvée." });
        }

        console.log("✅ Offres trouvées :", rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des offres :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
// 🔄 Route : modifier une offre// 🔄 Route : modifier une offre
// 🔄 Route : modifier une offre
router.put('/modifier/:id_offre', async (req, res) => {
    const { id_offre } = req.params;
    const {
        typePoste,
        missions,
        salaire,
        local,
        competences,
        nomESE,
        domaine,
        datePublication,
        statut
    } = req.body;

    console.log("🔄 Route /modifier/:id_offre appelée avec id =", id_offre);

    try {
        const [result] = await db.query(`
            UPDATE Offre SET 
                typePoste = ?, 
                missions = ?, 
                salaire = ?, 
                local = ?, 
                competences = ?, 
                nomESE = ?, 
                domaine = ?, 
                datePublication = ?, 
                statut = ?
            WHERE id_offre = ?
        `, [
            typePoste,
            missions,
            salaire,
            local,
            competences,
            nomESE,
            domaine,
            datePublication,
            statut,
            id_offre
        ]);

        if (result.affectedRows === 0) {
            console.log("⚠️ Aucune offre modifiée. L'offre n'existe peut-être pas.");
            return res.status(404).json({ message: "Offre non trouvée." });
        }

        console.log("✅ Offre modifiée avec succès.");
        res.status(200).json({ message: "Offre modifiée avec succès." });
    } catch (error) {
        console.error("❌ Erreur lors de la modification de l'offre :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
// Récupérer une offre par ID
router.get('/offre/:id_offre', async (req, res) => {
    const { id_offre } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Offre WHERE id_offre = ?', [id_offre]); // 🛠️ correction ici
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Offre non trouvée' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Erreur récupération offre :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});



module.exports = router;
