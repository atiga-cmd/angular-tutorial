const express = require("express");
const router = express.Router();
const recruteurController = require("../controllers/recruteurController");

// Ajouter un recruteur
router.post("/", recruteurController.createRecruteur);

// Récupérer tous les recruteurs
router.get("/", recruteurController.getAllRecruteurs);

// Récupérer un recruteur par ID
router.get("/:id", recruteurController.getRecruteurById);

// Modifier un recruteur
router.put("/:id", recruteurController.updateRecruteur);

// Supprimer un recruteur
router.delete("/:id", recruteurController.deleteRecruteur);

module.exports = router;
