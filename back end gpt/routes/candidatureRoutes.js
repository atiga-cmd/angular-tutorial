/*const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController');

router.post('/', candidatureController.createCandidature);
router.get('/', candidatureController.getAllCandidatures);
router.get('/:id', candidatureController.getCandidatureById);
router.delete('/:id', candidatureController.deleteCandidature);

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const CandidatureController = require('../controllers/candidatureController');

// POST candidature
router.post('/postuler', CandidatureController.postulerOffre);

// GET candidatures by candidat ID
router.get('/candidat/:id', CandidatureController.getCandidaturesByCandidatId);

// DELETE candidature
router.delete('/supprimer/:id_candidature', CandidatureController.deleteCandidature);

// GET all candidatures
router.get('/', CandidatureController.getAllCandidatures);

// GET candidature by ID
router.get('/:id', CandidatureController.getCandidatureById);

module.exports = router;

