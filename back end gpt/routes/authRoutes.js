/*const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authController = require('../controllers/authController'); // Assurez-vous que ce fichier existe !

router.post('/register/candidat', authController.registerCandidat);
router.post('/login/candidat', authController.loginCandidat);
router.post('/login', authController.login); 
module.exports = router;
*/
// Route pour la connexion
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Assurez-vous que ce fichier existe !

// Route pour la connexion
router.post('/login', authController.login); 

module.exports = router;
