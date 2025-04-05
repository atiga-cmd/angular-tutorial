/*const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');

router.post('/', offreController.createOffre);
router.get('/', offreController.getAllOffres);
router.get('/:id', offreController.getOffreById);
router.put('/:id', offreController.updateOffre);
router.delete('/:id', offreController.deleteOffre);

module.exports = router;
*/


const express = require('express');
const router = express.Router();
const OffreController = require('../controllers/offreController');

// Assurez-vous que chaque fonction dans le contrôleur est bien définie
router.post('/offres', OffreController.ajouterOffre);
router.get('/offres', OffreController.getOffres);
router.delete('/supprimer/:id_offre', OffreController.deleteOffre);

module.exports = router;
