/*const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Token manquant." });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide." });
    }
};
*/const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "⛔ Token manquant ou mal formaté." });
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log("🔹 Token reçu :", token);
        console.log("🔹 Clé JWT utilisée pour vérification :", process.env.JWT_SECRET);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log("✅ Token décodé :", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("❌ Erreur JWT :", error.message);
        res.status(401).json({ message: "🚫 Token invalide.", error: error.message });
    }
};
