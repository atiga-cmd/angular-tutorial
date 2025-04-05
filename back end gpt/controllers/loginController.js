const loginController = async (req, res) => {
    try {
        console.log("➡️ Requête reçue pour connexion:", req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await db.promise().query(`SELECT * FROM candidat WHERE email = ?`, [email]);
        if (user[0].length === 0) {
            return res.status(401).json({ message: "Email incorrect" });
        }

        console.log("✅ Utilisateur trouvé:", user[0]);

        // Vérification du mot de passe (remplace ceci par bcrypt si chiffré)
        if (user[0][0].password !== password) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        res.json({ message: "Connexion réussie!", user: user[0][0] });
    } catch (error) {
        console.error("❌ Erreur lors de la connexion:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
