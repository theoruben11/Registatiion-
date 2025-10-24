const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route principale pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour l'inscription (POST)
app.post('/signup', express.json(), (req, res) => {
    const { name, email, password } = req.body;
    
    // Ici vous pouvez ajouter la logique pour sauvegarder l'utilisateur
    console.log('Nouvel utilisateur:', { name, email });
    
    res.json({ 
        success: true, 
        message: 'Compte créé avec succès!' 
    });
});

// Route pour la connexion (POST)
app.post('/signin', express.json(), (req, res) => {
    const { email, password } = req.body;
    
    // Ici vous pouvez ajouter la logique pour vérifier les identifiants
    console.log('Tentative de connexion:', { email });
    
    res.json({ 
        success: true, 
        message: 'Connexion réussie!',
        redirect: '/dashboard.html'
    });
});

// Route pour servir le dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📁 Fichiers statiques servis depuis: ${__dirname}`);
});
