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

router.post('/postuler', CandidatureController.postulerOffre);
router.get('/candidat/:id_candidat', CandidatureController.getCandidaturesByCandidat);
router.delete('/supprimer/:id_candidature', CandidatureController.deleteCandidature);

module.exports = router;
