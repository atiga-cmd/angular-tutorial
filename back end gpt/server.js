/*
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const session = require('express-session'); // Importer express-session

const app = express();


app.use(session({
    secret: 'ton_secret', // سر الجلسة
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true } // تأكد من تمكين الـ httpOnly للكويكز
}));

const candidatureRoutes = require('./routes/candidatureRoutes');

// ✅ Connexion MySQL optimisée avec `createPool()`
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recrutement_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise(); // ✅ Active le mode async/await

// ✅ Middleware
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200',  // حدد الدومين بشكل صريح
    credentials: true                 // مهم جدا لتمرير الكوكيز والجلسة
  }));


  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next(); // نكمل للراوترات
  });




app.use(express.json());
//app.use('/api', offreRoutes); // Assurez-vous que les routes sont préfixées par /api
app.use('/api/candidatures', candidatureRoutes);

//// ✅ Inscription recruteur
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

        console.log('Résultat de l’insertion :', result); // Ajout du log pour vérifier

        res.status(201).json({ 
            message: 'Candidat ajouté avec succès',
            id_candidat: result.insertId // Vérifie si ce champ est bien récupéré
        });

    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});


// ✅ Authentification
// ✅ Authentification
app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si c'est un candidat
        const [candidat] = await db.query(
            'SELECT id_candidat AS id FROM Candidat WHERE emailCand = ? AND motPasse_cand = ?', 
            [email, password]
        );

        if (candidat.length > 0) {
            req.session.id = candidat[0].id; // Stocke l'ID du candidat dans la session
            return res.json({ id: candidat[0].id, type: "candidat" });
        }

        // Vérifier si c'est un recruteur
        const [recruteur] = await db.query(
            'SELECT id_rec AS id FROM Recruteur WHERE emailRec = ? AND motPasse_rec = ?', 
            [email, password]
        );

        if (recruteur.length > 0) {
            req.session.id_rec = recruteur[0].id; // Stocke l'ID du recruteur dans la session
            return res.json({ id: recruteur[0].id, type: "recruteur" });
        }

        return res.status(401).json({ message: "Email ou mot de passe incorrect." });

    } catch (error) {
        console.error("❌ Erreur lors de la connexion:", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

//  Récupérer un candidat par id
app.get('/api/candidat/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); // ✅ Convertir l'ID en nombre

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
    const id = req.params.id;

    try {
        const [rows] = await db.query('SELECT * FROM Recruteur WHERE id_rec = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Recruteur non trouvé' });
        }

        res.json(rows[0]); 

    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
//***************************************************** 
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

// Route pour ajouter une offre sans spécifier l'ID du recruteur
app.post('/api/offres', (req, res) => {
    const { nomESE, local, typePoste, missions, competences, domaine, salaire, datePublication, statut } = req.body;
    const id_rec = req.session.id_rec; // Récupérer l'ID du recruteur depuis la session

    // Vérification des champs obligatoires
    if (!nomESE || !local || !typePoste || !missions || !competences || !domaine || !salaire || !datePublication || !statut) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    // Vérification que l'ID du recruteur est disponible dans la session
    if (!id_rec) {
        return res.status(401).json({ message: "Utilisateur non authentifié. Veuillez vous connecter." });
    }

    // Requête SQL pour insérer l'offre dans la base de données
    const query = `INSERT INTO Offre (nomESE, local, typePoste, missions, competences, domaine, salaire, datePublication, statut, id_rec) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [nomESE, local, typePoste, missions, competences, domaine, salaire, datePublication, statut, id_rec], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'offre:', err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'offre' });
        }

        // Message de succès après l'ajout de l'offre
        res.status(201).json({ message: 'Offre ajoutée avec succès !' });
    });
});



// ✅ Lancement du serveur
app.listen(5000, () => {
    console.log('🚀 Serveur lancé sur http://localhost:5000');
});
*/


const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
const offreRoutes = require('./routes/offreRoutes');  // Assurez-vous que ce chemin est correct
const candidatureRoutes = require('./routes/candidatureRoutes');

// ✅ Connexion MySQL optimisée avec `createPool()`
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recrutement_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise(); // ✅ Active le mode async/await

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use('/api', offreRoutes); // Assurez-vous que les routes sont préfixées par /api
app.use('/api/candidatures', candidatureRoutes);

//// ✅ Inscription recruteur
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

        console.log('Résultat de l’insertion :', result); // Ajout du log pour vérifier

        res.status(201).json({ 
            message: 'Candidat ajouté avec succès',
            id_candidat: result.insertId // Vérifie si ce champ est bien récupéré
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

//  Récupérer un candidat par id
app.get('/api/candidat/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); // ✅ Convertir l'ID en nombre

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
    const id = req.params.id;

    try {
        const [rows] = await db.query('SELECT * FROM Recruteur WHERE id_rec = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Recruteur non trouvé' });
        }

        res.json(rows[0]); 

    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
//***************************************************** 
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


//********** */
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


//******************************************************** 


app.post('/api/offre', (req, res) => {
    const { nomEntreprise, local, typePoste, missions, competences, domaine, salaire, statut, datePublication, id_rec } = req.body;
    
    const sql = 'INSERT INTO Offre (nomESE, local, typePoste, missions, competences, domaine, salaire, statut, datePublication, id_rec) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [nomEntreprise, local, typePoste, missions, competences, domaine, salaire, statut, datePublication, id_rec], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout de l\'offre', err);
        res.status(500).send('Erreur lors de l\'ajout de l\'offre');
      } else {
        res.status(200).send('Offre ajoutée avec succès');
      }
    });
  });
// Récupérer toutes les offres
app.get('/api/offres', (req, res) => {
    const sql = 'SELECT * FROM Offre';  // Récupérer toutes les offres
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur récupération des offres:', err);
            return res.status(500).send('Erreur serveur');
        }

        if (result.length === 0) {
            return res.status(404).send('Aucune offre trouvée');
        }

        res.json(result);  // Retourne toutes les offres sous forme de JSON
    });
});





// ✅ Lancement du serveur
app.listen(5000, () => {
    console.log('🚀 Serveur lancé sur http://localhost:5000');
});


