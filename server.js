const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Stockage en mémoire des utilisateurs
let users = [];
let nextUserId = 1;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route principale pour servir la page de connexion/inscription
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour l'inscription (POST)
app.post('/signup', express.json(), (req, res) => {
    const { name, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.json({ 
            success: false, 
            message: 'Un compte avec cet email existe déjà!' 
        });
    }
    
    // Créer un nouvel utilisateur
    const newUser = {
        id: nextUserId++,
        name: name,
        email: email,
        password: password, // En production, il faudrait hasher le mot de passe
        avatar: `https://via.placeholder.com/150x150/0be2ac/ffffff?text=${name.charAt(0).toUpperCase()}`,
        bio: 'Nouvel utilisateur du réseau social',
        followers: 0,
        following: 0,
        posts: 0,
        createdAt: new Date().toISOString()
    };
    
    // Sauvegarder l'utilisateur
    users.push(newUser);
    
    console.log('Nouvel utilisateur créé:', { id: newUser.id, name, email });
    console.log('Total utilisateurs:', users.length);
    
    res.json({ 
        success: true, 
        message: 'Compte créé avec succès!',
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

// Route pour la connexion (POST)
app.post('/signin', express.json(), (req, res) => {
    const { email, password } = req.body;
    
    // Chercher l'utilisateur
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.json({ 
            success: false, 
            message: 'Email ou mot de passe incorrect!' 
        });
    }
    
    console.log('Connexion réussie:', { id: user.id, name: user.name, email });
    
    res.json({ 
        success: true, 
        message: 'Connexion réussie!',
        redirect: '/social',
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// Route pour servir le réseau social
app.get('/social', (req, res) => {
    res.sendFile(path.join(__dirname, 'social.html'));
});

// Route pour voir tous les utilisateurs (pour debug)
app.get('/api/users/all', (req, res) => {
    res.json({ 
        success: true, 
        users: users,
        total: users.length 
    });
});

// API Routes pour le réseau social
// Route pour récupérer les posts
app.get('/api/posts', (req, res) => {
    // Simuler des données de posts
    const posts = [
        {
            id: 1,
            userId: 2,
            userName: 'Marie Dubois',
            userAvatar: 'https://via.placeholder.com/40x40/ff6b6b/ffffff?text=M',
            content: 'Nouveau projet en cours ! Excité de partager les résultats avec vous tous. 🚀',
            image: null,
            time: 'Il y a 2 heures',
            likes: 12,
            comments: 3,
            isLiked: false
        },
        {
            id: 2,
            userId: 3,
            userName: 'Jean Martin',
            userAvatar: 'https://via.placeholder.com/40x40/4ecdc4/ffffff?text=J',
            content: 'Belle journée pour une promenade dans le parc. La nature est vraiment apaisante.',
            image: 'https://via.placeholder.com/600x300/4ecdc4/ffffff?text=Nature+Photo',
            time: 'Il y a 4 heures',
            likes: 8,
            comments: 1,
            isLiked: true
        }
    ];
    
    res.json({ success: true, posts });
});

// Route pour créer un nouveau post
app.post('/api/posts', express.json(), (req, res) => {
    const { content, image } = req.body;
    
    console.log('Nouveau post créé:', { content, image });
    
    res.json({ 
        success: true, 
        message: 'Post créé avec succès!',
        post: {
            id: Date.now(),
            content,
            image,
            time: 'À l\'instant',
            likes: 0,
            comments: 0,
            isLiked: false
        }
    });
});

// Route pour récupérer les utilisateurs
app.get('/api/users', (req, res) => {
    const users = [
        {
            id: 2,
            name: 'Marie Dubois',
            email: 'marie@example.com',
            avatar: 'https://via.placeholder.com/150x150/ff6b6b/ffffff?text=M',
            bio: 'Développeuse passionnée',
            followers: 150,
            following: 200,
            posts: 45,
            isFollowing: false
        },
        {
            id: 3,
            name: 'Jean Martin',
            email: 'jean@example.com',
            avatar: 'https://via.placeholder.com/150x150/4ecdc4/ffffff?text=J',
            bio: 'Designer créatif',
            followers: 300,
            following: 150,
            posts: 78,
            isFollowing: true
        }
    ];
    
    res.json({ success: true, users });
});

// Route pour récupérer les conversations
app.get('/api/conversations', (req, res) => {
    const conversations = [
        {
            id: 1,
            userId: 2,
            userName: 'Marie Dubois',
            userAvatar: 'https://via.placeholder.com/48x48/ff6b6b/ffffff?text=M',
            lastMessage: 'Salut ! Comment ça va ?',
            time: '14:30',
            unread: 2
        },
        {
            id: 2,
            userId: 3,
            userName: 'Jean Martin',
            userAvatar: 'https://via.placeholder.com/48x48/4ecdc4/ffffff?text=J',
            lastMessage: 'Merci pour le partage !',
            time: '12:15',
            unread: 0
        }
    ];
    
    res.json({ success: true, conversations });
});

// Route pour récupérer les messages d'une conversation
app.get('/api/conversations/:id/messages', (req, res) => {
    const conversationId = req.params.id;
    
    // Simuler des messages
    const messages = [
        {
            id: 1,
            senderId: 2,
            content: 'Salut ! Comment ça va ?',
            time: '14:25',
            isSent: false
        },
        {
            id: 2,
            senderId: 1,
            content: 'Ça va bien merci ! Et toi ?',
            time: '14:26',
            isSent: true
        }
    ];
    
    res.json({ success: true, messages });
});

// Route pour envoyer un message
app.post('/api/conversations/:id/messages', express.json(), (req, res) => {
    const conversationId = req.params.id;
    const { content } = req.body;
    
    console.log('Nouveau message:', { conversationId, content });
    
    res.json({ 
        success: true, 
        message: 'Message envoyé!',
        messageData: {
            id: Date.now(),
            content,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            isSent: true
        }
    });
});

// Route pour suivre/unfollow un utilisateur
app.post('/api/users/:id/follow', express.json(), (req, res) => {
    const userId = req.params.id;
    const { action } = req.body; // 'follow' ou 'unfollow'
    
    console.log('Action de suivi:', { userId, action });
    
    res.json({ 
        success: true, 
        message: action === 'follow' ? 'Utilisateur suivi!' : 'Utilisateur non suivi!'
    });
});

// Route pour rechercher des utilisateurs
app.get('/api/users/search', (req, res) => {
    const query = req.query.q;
    
    if (!query || query.length < 2) {
        return res.json({ success: true, users: [] });
    }
    
    // Simuler une recherche
    const users = [
        {
            id: 2,
            name: 'Marie Dubois',
            avatar: 'https://via.placeholder.com/150x150/ff6b6b/ffffff?text=M',
            bio: 'Développeuse passionnée'
        }
    ].filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json({ success: true, users });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📁 Fichiers statiques servis depuis: ${__dirname}`);
});
