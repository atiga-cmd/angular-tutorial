

const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
const offreRoutes = require('./routes/offreRoutes');  // Assurez-vous que ce chemin est correct

// ✅ Connexion MySQL optimisée avec `createPool()` et utilisation du mode async/await
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recrutement_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise(); 

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use('/api', offreRoutes); // Routes liées aux offres

// ✅ Inscription recruteur
/*
app.post('/api/recruteurs', async (req, res) => {
    const { nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise } = req.body;

    if (!nomRec || !prenomRec || !emailRec || !motPasse_rec || !poste || !entreprise) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        // Vérifier si l'email est déjà utilisé
        const [exists] = await db.query('SELECT * FROM Recruteur WHERE emailRec = ?', [emailRec]);

        if (exists.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Insérer le recruteur dans la base de données
        await db.query(
            'INSERT INTO Recruteur (nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise) VALUES (?, ?, ?, ?, ?, ?)', 
            [nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise]
        );

        res.status(201).json({ message: 'Recruteur ajouté avec succès' });

    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});
*/
app.post('/api/recruteurs', async (req, res) => {
  const { nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise } = req.body;

  if (!nomRec || !prenomRec || !emailRec || !motPasse_rec || !poste || !entreprise) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailRec)) {
    return res.status(400).json({ message: 'Le format de l’e-mail est invalide.' });
  }

  try {
    const [exists] = await db.query('SELECT * FROM Recruteur WHERE emailRec = ?', [emailRec]);
    if (exists.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    await db.query(
      'INSERT INTO Recruteur (nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise) VALUES (?, ?, ?, ?, ?, ?)', 
      [nomRec, prenomRec, emailRec, motPasse_rec, poste, entreprise]
    );

    res.status(201).json({ message: 'Recruteur ajouté avec succès.' });
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});
/*
// ✅ Inscription candidat
app.post('/api/candidats', async (req, res) => {
    const { nomCand, prenomCand, emailCand, motPasse_cand, confirmer_motdepasse } = req.body;

    if (!nomCand || !prenomCand || !emailCand || !motPasse_cand || !confirmer_motdepasse) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    if (motPasse_cand !== confirmer_motdepasse) {
        return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
    }

    try {
        const [exists] = await db.query('SELECT * FROM Candidat WHERE emailCand = ?', [emailCand]);

        if (exists.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const [result] = await db.query(
            'INSERT INTO Candidat (nomCand, prenomCand, emailCand, motPasse_cand) VALUES (?, ?, ?, ?)', 
            [nomCand, prenomCand, emailCand, motPasse_cand]
        );

        console.log('Résultat de l’insertion :', result);

        res.status(201).json({ 
            message: 'Candidat ajouté avec succès',
            id_candidat: result.insertId
        });

    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});*/
// ✅ Inscription candidat avec validation du format email
app.post('/api/candidats', async (req, res) => {
  const { nomCand, prenomCand, emailCand, motPasse_cand, confirmer_motdepasse } = req.body;

  if (!nomCand || !prenomCand || !emailCand || !motPasse_cand || !confirmer_motdepasse) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  // Vérification du format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailCand)) {
      return res.status(400).json({ message: 'Le format de l’e-mail est invalide.' });
  }

  if (motPasse_cand !== confirmer_motdepasse) {
      return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
  }

  try {
      const [exists] = await db.query('SELECT * FROM Candidat WHERE emailCand = ?', [emailCand]);

      if (exists.length > 0) {
          return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }

      const [result] = await db.query(
          'INSERT INTO Candidat (nomCand, prenomCand, emailCand, motPasse_cand) VALUES (?, ?, ?, ?)', 
          [nomCand, prenomCand, emailCand, motPasse_cand]
      );

      console.log('Résultat de l’insertion :', result);

      res.status(201).json({ 
          message: 'Candidat ajouté avec succès',
          id_candidat: result.insertId
      });

  } catch (error) {
      console.error('❌ Erreur serveur:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});


// ✅ Authentification
app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 🔍 Vérifier si c'est un administrateur
        const [admin] = await db.query(
            'SELECT id_admin AS id FROM Admin WHERE email_admin = ? AND motPasse_admin = ?',
            [email, password]
        );

        if (admin.length > 0) {
            return res.json({ id: admin[0].id, type: "admin" });
        }
        // Vérifier si c'est un candidat
        const [candidat] = await db.query(
            'SELECT id_candidat AS id FROM Candidat WHERE emailCand = ? AND motPasse_cand = ?', 
            [email, password]
        );

        if (candidat.length > 0) {
            return res.json({ id: candidat[0].id, type: "candidat" });
        }

        // Vérifier si c'est un recruteur
        const [recruteur] = await db.query(
            'SELECT id_rec AS id FROM Recruteur WHERE emailRec = ? AND motPasse_rec = ?', 
            [email, password]
        );

        if (recruteur.length > 0) {
            return res.json({ id: recruteur[0].id, type: "recruteur" });
        }

        return res.status(401).json({ message: "Email ou mot de passe incorrect." });

    } catch (error) {
        console.error("❌ Erreur lors de la connexion:", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

// ✅ Récupérer un candidat par id
app.get('/api/candidat/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID candidat invalide" });
    }

    try {
        const [results] = await db.query('SELECT * FROM Candidat WHERE id_candidat = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({ message: "Candidat non trouvé" });
        }

        res.status(200).json(results[0]);

    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

// ✅ Récupérer un recruteur par ID
app.get('/api/recruteur/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID recruteur invalide" });
    }

    try {
        const [results] = await db.query('SELECT * FROM Recruteur WHERE id_rec = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({ message: "Recruteur non trouvé" });
        }

        res.status(200).json(results[0]);

    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

// ✅ Insertion des informations personnelles
app.post('/api/info-per', async (req, res) => {
    const { id_candidat, dateNaiss, sexe, etat_civil, ville, codePostal, permis, url_photo, numTel } = req.body;

    if (!id_candidat || !dateNaiss || !sexe || !etat_civil || !ville || !numTel) {
        return res.status(400).json({ message: 'Tous les champs obligatoires ne sont pas remplis.' });
    }

    try {
        const query = `INSERT INTO InformationsPersonnelles (id_candidat, dateNaiss, sexe, etat_civil, ville, codePostal, permis, url_photo, numTel)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.query(query, [id_candidat, dateNaiss, sexe, etat_civil, ville, codePostal, permis, url_photo, numTel]);

        res.status(201).json({ message: 'Informations personnelles enregistrées avec succès' });
    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

// ✅ Insertion des informations professionnelles
app.post('/api/info-pro', async (req, res) => {
    const { id_candidat, niveauEducation, diplomeObtenu, etablissement, niveauExperience, statutActuel, competences, langues, posteDesire, lieuTravailSouhaite, url_cv } = req.body;

    if (!id_candidat || !niveauEducation || !diplomeObtenu || !etablissement || !competences || !posteDesire) {
        return res.status(400).json({ message: 'Tous les champs obligatoires ne sont pas remplis.' });
    }

    try {
        const query = `INSERT INTO InformationsProfessionnelles (id_candidat, niveauEducation, diplomeObtenu, etablissement, niveauExperience, statutActuel, competences, langues, posteDesire, lieuTravailSouhaite, url_cv)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.query(query, [id_candidat, niveauEducation, diplomeObtenu, etablissement, niveauExperience, statutActuel, competences, langues, posteDesire, lieuTravailSouhaite, url_cv]);

        res.status(201).json({ message: 'Informations professionnelles enregistrées avec succès' });
    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});
///////
app.post('/api/offre', async (req, res) => {
    try {
        // Log les données envoyées dans le corps de la requête
        console.log("Données reçues :", req.body);

        const {
            nomEntreprise,
            local,
            typePoste,
            missions,
            competences,
            domaine,
            salaire,
            statut,
            datePublication,
            id_rec
        } = req.body;

        // Liste des champs obligatoires
        const requiredFields = [
            { name: 'nomEntreprise', value: nomEntreprise },
            { name: 'local', value: local },
            { name: 'typePoste', value: typePoste },
            { name: 'missions', value: missions },
            { name: 'competences', value: competences },
            { name: 'domaine', value: domaine },
            { name: 'statut', value: statut },
            { name: 'datePublication', value: datePublication },
            { name: 'salaire', value: salaire },
            { name: 'id_rec', value: id_rec }
        ];

        // Vérification des champs obligatoires
        const missingFields = requiredFields.filter(field => !field.value);
        if (missingFields.length > 0) {
            const missingFieldNames = missingFields.map(field => field.name).join(', ');
            return res.status(400).json({
                error: `Les champs suivants sont obligatoires : ${missingFieldNames}.`
            });
        }

        // SQL pour insérer l'offre dans la base de données
        const sql = `INSERT INTO Offre 
            (nomESE, local, typePoste, missions, competences, domaine, salaire, statut, datePublication, id_rec) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Exécution de la requête SQL
        const [result] = await db.query(sql, [
            nomEntreprise,
            local,
            typePoste,
            missions,
            competences,
            domaine,
            salaire,
            statut,
            datePublication,
            id_rec
        ]);

        // Log de l'insertion réussie
        console.log("Offre insérée avec succès, ID de l'offre:", result.insertId);

        return res.status(201).json({
            message: 'Offre ajoutée avec succès',
            id_offre: result.insertId
        });

    } catch (err) {
        // Log de l'erreur si une exception est levée
        console.error("Erreur lors de l'ajout de l'offre :", err);
        return res.status(500).json({ error: "Erreur lors de l'ajout de l'offre" });
    }
});



  //////////////////
  app.get('/api/offres/recruteur/:id', async (req, res) => {
    try {
      // Récupération et conversion de l'ID du recruteur depuis les paramètres de l'URL
      const recruiterId = parseInt(req.params.id, 10);
      
      // Vérifier que l'ID est un nombre valide
      if (isNaN(recruiterId)) {
        return res.status(400).json({ error: "ID recruteur invalide" });
      }
      
      // Préparation de la requête pour récupérer les offres du recruteur
      const sql = "SELECT * FROM Offre WHERE id_rec = ?";
      
      // Exécution de la requête en utilisant await pour attendre la réponse de la base de données
      const [offers] = await db.query(sql, [recruiterId]);
      
      // Si aucune offre n'est trouvée, on retourne une réponse informative
      if (offers.length === 0) {
        return res.status(404).json({ message: "Aucune offre trouvée pour ce recruteur" });
      }
      
      // Retourner la liste des offres sous forme de JSON avec un status 200 (OK)
      return res.status(200).json(offers);
    } catch (err) {
      console.error("Erreur lors de la récupération des offres du recruteur :", err);
      return res.status(500).json({ error: "Erreur lors de la récupération des offres" });
    }
  });
  

// ✅ Récupérer toutes les offres
app.get('/api/offres', (req, res) => {
    const sql = 'SELECT * FROM Offre';
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur récupération des offres:', err);
            return res.status(500).send('Erreur serveur');
        }

        if (result.length === 0) {
            return res.status(404).send('Aucune offre trouvée');
        }

        res.json(result);
    });
});
//
// Endpoint pour rechercher des candidats
app.get('/api/recherche-candidats', async (req, res) => {
    const { competence, posteDesire } = req.query;

    if (!competence && !posteDesire) {
        return res.status(400).json({ error: 'Veuillez spécifier les compétences ou le poste désiré.' });
    }

    let sql = `
        SELECT 
            InformationsProfessionnelles.*, 
            Candidat.nomCand AS nom, 
            Candidat.prenomCand AS prenom, 
            Candidat.emailCand AS email
        FROM InformationsProfessionnelles
        INNER JOIN Candidat ON InformationsProfessionnelles.id_candidat = Candidat.id_candidat
        WHERE 1=1
    `;
    const params = [];

    if (competence) {
        sql += ' AND InformationsProfessionnelles.competences LIKE ?';
        params.push(`%${competence}%`);
    }
    if (posteDesire) {
        sql += ' AND InformationsProfessionnelles.posteDesire LIKE ?';
        params.push(`%${posteDesire}%`);
    }

    try {
        const [rows] = await db.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la recherche de candidats:', err);
        res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
});
// Modifier un recruteur
app.put('/api/recruteur/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nomRec, prenomRec, emailRec, poste, entreprise } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID recruteur invalide" });
    }

    try {
        const [result] = await db.query(
            `UPDATE Recruteur
             SET nomRec = ?, prenomRec = ?, emailRec = ?, poste = ?, entreprise = ?
             WHERE id_rec = ?`,
            [nomRec, prenomRec, emailRec, poste, entreprise, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Recruteur non trouvé" });
        }

        res.status(200).json({ message: "Profil recruteur mis à jour avec succès" });
    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

app.put('/api/recruteur/password/:id', async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Ancien et nouveau mot de passe sont requis" });
    }

    try {
        // Vérifier que l'ancien mot de passe est correct
        const [user] = await db.query('SELECT motPasse_rec FROM Recruteur WHERE id_rec = ?', [id]);

        if (user.length === 0) {
            return res.status(404).json({ message: "Recruteur non trouvé" });
        }

        if (user[0].motPasse_rec !== oldPassword) {
            return res.status(400).json({ message: "Ancien mot de passe incorrect" });
        }

        // Mise à jour du mot de passe
        await db.query('UPDATE Recruteur SET motPasse_rec = ? WHERE id_rec = ?', [newPassword, id]);

        res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});
app.delete('/api/recruteur/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM Recruteur WHERE id_rec = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Recruteur non trouvé" });
        }

        res.status(200).json({ message: "Recruteur supprimé avec succès" });
    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});
//////////////////////////////////////////////
app.get('/api/candidats/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const [candidatRows] = await db.query(
        'SELECT nomCand, prenomCand, emailCand FROM Candidat WHERE id_candidat = ?',
        [id]
      );
  
      if (!candidatRows.length) return res.status(404).json({ message: 'Candidat non trouvé' });
  
      const [infoPersoRows] = await db.query(
        'SELECT dateNaiss, sexe, etat_civil, ville, codePostal, permis, numTel FROM InformationsPersonnelles WHERE id_candidat = ?',
        [id]
      );
  
      const [infoProRows] = await db.query(
        'SELECT niveauEducation, diplomeObtenu, etablissement, niveauExperience, statutActuel, competences, langues, posteDesire, lieuTravailSouhaite FROM InformationsProfessionnelles WHERE id_candidat = ?',
        [id]
      );
  
      const profil = {
        ...candidatRows[0],
        ...infoPersoRows[0] || {}, // si vide, éviter undefined
        ...infoProRows[0] || {}
      };
  
      res.json(profil);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  app.put('/api/candidats/:id', async (req, res) => {
    const id = req.params.id;
    const {
      nomCand, prenomCand, emailCand,
      dateNaiss, sexe, etat_civil, ville, codePostal, permis, numTel,
      niveauEducation, diplomeObtenu, etablissement, niveauExperience,
      statutActuel, competences, langues, posteDesire, lieuTravailSouhaite
    } = req.body;
  
    try {
      await db.query(`UPDATE Candidat SET nomCand = ?, prenomCand = ?, emailCand = ? WHERE id_candidat = ?`,
        [nomCand, prenomCand, emailCand, id]);
  
      // Vérifier si des données existent déjà
      const [persoExist] = await db.query('SELECT id FROM InformationsPersonnelles WHERE id_candidat = ?', [id]);
      if (persoExist.length) {
        await db.query(`UPDATE InformationsPersonnelles SET dateNaiss = ?, sexe = ?, etat_civil = ?, ville = ?, codePostal = ?, permis = ?, numTel = ? WHERE id_candidat = ?`,
          [dateNaiss, sexe, etat_civil, ville, codePostal, permis, numTel, id]);
      } else {
        await db.query(`INSERT INTO InformationsPersonnelles (id_candidat, dateNaiss, sexe, etat_civil, ville, codePostal, permis, numTel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [id, dateNaiss, sexe, etat_civil, ville, codePostal, permis, numTel]);
      }
  
      const [proExist] = await db.query('SELECT id FROM InformationsProfessionnelles WHERE id_candidat = ?', [id]);
      if (proExist.length) {
        await db.query(`UPDATE InformationsProfessionnelles SET niveauEducation = ?, diplomeObtenu = ?, etablissement = ?, niveauExperience = ?, statutActuel = ?, competences = ?, langues = ?, posteDesire = ?, lieuTravailSouhaite = ? WHERE id_candidat = ?`,
          [niveauEducation, diplomeObtenu, etablissement, niveauExperience, statutActuel, competences, langues, posteDesire, lieuTravailSouhaite, id]);
      } else {
        await db.query(`INSERT INTO InformationsProfessionnelles (id_candidat, niveauEducation, diplomeObtenu, etablissement, niveauExperience, statutActuel, competences, langues, posteDesire, lieuTravailSouhaite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [id, niveauEducation, diplomeObtenu, etablissement, niveauExperience, statutActuel, competences, langues, posteDesire, lieuTravailSouhaite]);
      }
  
      res.status(200).json({ message: 'Profil candidat mis à jour avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour' });
    }
  });
  app.put('/api/candidats/:id/password', async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const id = req.params.id;
  
    try {
      const [rows] = await db.query('SELECT motPasse_cand FROM Candidat WHERE id_candidat = ?', [id]);
      if (!rows.length) return res.status(404).json({ message: 'Candidat non trouvé' });
  
      const isMatch = oldPassword === rows[0].motPasse_cand; // À remplacer par bcrypt.compare() si hachage
  
      if (!isMatch) return res.status(401).json({ message: 'Ancien mot de passe incorrect' });
  
      // Si tu veux hacher : const hashed = await bcrypt.hash(newPassword, 10);
      await db.query('UPDATE Candidat SET motPasse_cand = ? WHERE id_candidat = ?', [newPassword, id]);
      res.json({ message: 'Mot de passe modifié avec succès' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  app.delete('/api/candidats/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const [result] = await db.query('DELETE FROM Candidat WHERE id_candidat = ?', [id]);
  
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Candidat non trouvé' });
  
      res.json({ message: 'Compte supprimé avec succès' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la suppression du compte' });
    }
  });
    


// Recherche d'offres
app.get('/api/recherche-offres', async (req, res) => {
    const { competence, localisation } = req.query;

    // Vérification si les critères sont présents
    if (!competence && !localisation) {
        return res.status(400).json({ error: 'Veuillez spécifier les compétences ou la localisation.' });
    }

    let sql = `
        SELECT * FROM Offre
        WHERE 1=1
    `;
    const params = [];

    // Ajouter un filtre pour la compétence si fourni
    if (competence) {
        sql += ' AND competences LIKE ?';
        params.push(`%${competence}%`);
    }

    // Ajouter un filtre pour la localisation si fourni
    if (localisation) {
        sql += ' AND local LIKE ?';
        params.push(`%${localisation}%`);
    }

    try {
        // Exécution de la requête SQL
        const [rows] = await db.query(sql, params);

        // Si aucune offre n'est trouvée
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Aucune offre trouvée avec ces critères.' });
        }

        // Retourner les résultats des offres trouvées
        res.status(200).json(rows);
    } catch (err) {
        console.error('Erreur lors de la recherche d\'offres:', err);
        res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
});


// Enregistrer une candidature
// 📩 Enregistrer une candidature
app.post('/api/candidatures', async (req, res) => {
    const { id_candidat, id_offre, date } = req.body;

    console.log("📥 Données reçues :", { id_candidat, id_offre, date });

    if (!id_candidat || !id_offre || !date) {
        console.log("❗ Champs manquants");
        return res.status(400).json({ message: 'Champs manquants' });
    }

    const sql = `INSERT INTO Candidature (id_candidat, id_offre, date) VALUES (?, ?, ?)`;

    try {
        const [result] = await db.query(sql, [id_candidat, id_offre, date]);
        console.log("✅ Insertion réussie !");
        console.log("🟢 Réponse envoyée : Candidature enregistrée");
        return res.status(200).json({ message: '✅ Candidature enregistrée' });
    } catch (err) {
        console.error("❌ Erreur SQL :", err.message);
        return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// 📄 Obtenir les candidatures d'un candidat
app.get('/api/candidatures/:id_candidat', async (req, res) => {
    const id_candidat = parseInt(req.params.id_candidat, 10);

    if (isNaN(id_candidat)) {
        return res.status(400).json({ message: "ID candidat invalide" });
    }

    const sql = `
        SELECT c.id_candidature, c.date, o.nomESE, o.typePoste, o.local, o.competences, o.domaine
        FROM Candidature c
        INNER JOIN Offre o ON c.id_offre = o.id_offre
        WHERE c.id_candidat = ?
        ORDER BY c.date DESC
    `;

    try {
        const [rows] = await db.query(sql, [id_candidat]);
        res.status(200).json(rows);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des candidatures :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});
     // ❌ Supprimer une candidature
app.delete('/api/candidatures/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID candidature invalide" });
    }

    try {
        const [result] = await db.query(
            `DELETE FROM Candidature WHERE id_candidature = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Candidature non trouvée" });
        }

        res.status(200).json({ message: "Candidature annulée avec succès" });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});
// Récupérer les Informations Personnelles d’un candidat
app.get('/api/persoinfo/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID candidat invalide.' });
    }
  
    try {
      const [rows] = await db.query(
        `SELECT dateNaiss, sexe, etat_civil, ville, codePostal, permis, url_photo, numTel
         FROM InformationsPersonnelles
         WHERE id_candidat = ?`,
        [id]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Aucune info personnelle trouvée.' });
      }
  
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error('❌ Erreur persoinfo:', err);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des informations personnelles.' });
    }
  });
  
  // Récupérer les Informations Professionnelles d’un candidat
  app.get('/api/proinfo/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID candidat invalide.' });
    }
  
    try {
      const [rows] = await db.query(
        `SELECT niveauEducation, diplomeObtenu, etablissement, niveauExperience,
                statutActuel, competences, langues, posteDesire, lieuTravailSouhaite, url_cv
         FROM InformationsProfessionnelles
         WHERE id_candidat = ?`,
        [id]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Aucune info professionnelle trouvée.' });
      }
  
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error('❌ Erreur proinfo:', err);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des informations professionnelles.' });
    }
  });
  



// Récupérer les infos d’un candidat
app.get('/api/candidat-info/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const [candidat] = await db.query('SELECT * FROM Candidat WHERE id_candidat = ?', [id]);
      const [infoPerso] = await db.query('SELECT * FROM InformationsPersonnelles WHERE id_candidat = ?', [id]);
      const [infoPro] = await db.query('SELECT * FROM InformationsProfessionnelles WHERE id_candidat = ?', [id]);
  
      res.json({
        candidat: candidat[0],
        infoPerso: infoPerso[0],
        infoPro: infoPro[0]
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  app.post('/api/envoyer-message', async (req, res) => {
    const { id_candidat, id_rec, contenu } = req.body;
  
    if (!id_candidat || !id_rec || !contenu) {
      return res.status(400).json({ message: 'Champs manquants' });
    }
  
    const date = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD
    const statut = 'Non lu';
  
    try {
      const sql = `
        INSERT INTO Message (id_candidat, id_rec, contenu, date, statut)
        VALUES (?, ?, ?, ?, ?)
      `;
      await db.query(sql, [id_candidat, id_rec, contenu, date, statut]);
  
      res.status(200).json({ message: 'Message envoyé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  });
    
  ///////////////////////////////////
  app.get('/api/messages-candidat/:idCandidat', async (req, res) => {
    const idCandidat = req.params.idCandidat;
    console.log("🔍 Requête reçue pour les messages du candidat ID:", idCandidat);
  
    const sql = `
      SELECT m.id_message, m.contenu, m.date, m.statut, r.nomRec, r.prenomRec
      FROM Message m
      LEFT JOIN Recruteur r ON m.id_rec = r.id_rec
      WHERE m.id_candidat = ?
      ORDER BY m.date DESC
    `;
  
    try {
      const [results] = await db.query(sql, [idCandidat]);
  
      console.log("✅ Nombre de messages récupérés :", results.length);
      res.json(results);
    } catch (error) {
      console.error("❗ Erreur SQL :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });
  
  
  app.get('/api/candidatures-recu/:idRec', async (req, res) => {
    const idRec = req.params.idRec;
    console.log("📩 Candidatures reçues pour recruteur ID :", idRec);
  
    const sql = `
      SELECT 
        c.id_candidature,
        c.date AS date_postulation,
  
        ca.id_candidat,
        ca.nomCand,
        ca.prenomCand,
        ca.emailCand,
  
        ip.ville,
        ip.numTel,
        ip.sexe,
  
        o.id_offre,
        o.typePoste AS titre_offre,
        o.local,
        o.domaine
  
      FROM Candidature c
      INNER JOIN Candidat ca ON ca.id_candidat = c.id_candidat
      LEFT JOIN InformationsPersonnelles ip ON ip.id_candidat = ca.id_candidat
      INNER JOIN Offre o ON o.id_offre = c.id_offre
      WHERE o.id_rec = ?
      ORDER BY c.date DESC
    `;
  
    try {
      const [rows] = await db.query(sql, [idRec]);
      console.log("✅ Nombre de candidatures récupérées :", rows.length);
      res.json(rows);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des candidatures :", err);
      res.status(500).json({ error: "Erreur serveur lors de la récupération des candidatures." });
    }
  });
  /////////
  app.get('/api/admin/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [admin] = await db.query(
        'SELECT id_admin, nom_admin, prenom_admin, email_admin, motPasse_admin FROM Admin WHERE id_admin = ?',
        [id]
      );
  
      if (admin.length === 0) {
        return res.status(404).json({ message: 'Administrateur non trouvé.' });
      }
  
      res.json(admin[0]);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération de l’admin :", error);
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
  });
  app.put('/api/admin/:id', async (req, res) => {
    const { id } = req.params;
    const { nom_admin, prenom_admin, email_admin, motPasse_admin } = req.body;
  
    try {
      const result = await db.query(
        `UPDATE Admin SET nom_admin = ?, prenom_admin = ?, email_admin = ?, motPasse_admin = ? WHERE id_admin = ?`,
        [nom_admin, prenom_admin, email_admin, motPasse_admin, id]
      );
  
      res.json({ message: 'Admin modifié avec succès' });
    } catch (error) {
      console.error("Erreur de mise à jour de l’admin :", error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
    
  app.delete('/api/admin/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM Admin WHERE id_admin = ?', [id]);
      res.json({ message: 'Compte administrateur supprimé avec succès.' });
    } catch (error) {
      console.error("Erreur suppression admin :", error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  });//////////////////////////////////
  app.get('/api/recruteurs', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM Recruteur');
      res.json(rows);
    } catch (error) {
      console.error("Erreur lors du chargement des recruteurs :", error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  app.delete('/api/recruteur/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM Recruteur WHERE id_rec = ?', [id]);
      res.json({ message: 'Recruteur supprimé' });
    } catch (error) {
      console.error("Erreur suppression recruteur :", error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  app.get('/api/candidats', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM Candidat');
      res.json(rows);
    } catch (error) {
      console.error("Erreur lors du chargement des candidats :", error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
    
  app.get('/api/candidat/details/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [perso] = await db.query(
        'SELECT * FROM InformationsPersonnelles WHERE id_candidat = ?', [id]
      );
  
      const [pro] = await db.query(
        'SELECT * FROM InformationsProfessionnelles WHERE id_candidat = ?', [id]
      );
  
      const [basic] = await db.query(
        'SELECT nomCand, prenomCand, emailCand FROM Candidat WHERE id_candidat = ?', [id]
      );
  
      res.json({
        candidat: basic[0] || {},
        perso: perso[0] || {},
        pro: pro[0] || {}
      });
  
    } catch (error) {
      console.error("Erreur récupération détails candidat :", error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  app.delete('/api/candidat/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM Candidat WHERE id_candidat = ?', [id]);
      res.json({ message: 'Candidat supprimé' });
    } catch (error) {
      console.error("Erreur suppression candidat :", error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
    // Supprimer une offre
app.delete('/api/offres/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Offre WHERE id_offre = ?', [id]);
    res.json({ message: 'Offre supprimée avec succès.' });
  } catch (error) {
    console.error("❌ Erreur suppression offre :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'offre." });
  }
});
    
// ✅ Lancement du serveur
app.listen(5000, () => {
    console.log('🚀 Serveur lancé sur http://localhost:5000');
});
