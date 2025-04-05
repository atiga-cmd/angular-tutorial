/*const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidatController');
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware'); // Middleware JWT

// 🔐 Route protégée : Profil du candidat
router.get('/profil', auth, (req, res) => {
    res.json({ message: "🔒 هذه صفحة محمية!", user: req.user });
});

// 📌 Routes d'authentification (inscription et connexion)
router.post('/register', authController.registerCandidat);
router.post('/login', authController.loginCandidat);

// 📌 Routes CRUD pour les candidats
router.get('/', candidatController.getAll);
router.get('/:id', candidatController.getById);
router.delete('/:id', candidatController.delete);

module.exports = router;
*/

// Dans 'routes/candidatRoutes.js'
const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidatController'); // Vérifie que le chemin est correct

// Route pour ajouter un candidat
router.post('/ajouter', candidatController.create); // La fonction 'create' doit être définie dans le contrôleur

// Autres routes (si nécessaire)
router.get('/', candidatController.getAll);
router.get('/:id', candidatController.getById);
router.delete('/:id', candidatController.delete);

module.exports = router;
