# 💾 Stockage des Comptes - Résumé Complet

## 🎯 **Réponse à votre Question**

**Où sont stockés les comptes créés ?**

### 📍 **Localisation Actuelle**
Les comptes sont stockés **en mémoire** dans le serveur Node.js, dans le fichier `server.js` :

```javascript
// Stockage en mémoire des utilisateurs
let users = [];
let nextUserId = 1;
```

## 🔧 **Fonctionnalités Implémentées**

### ✅ **Système de Stockage**
- **Tableau en mémoire** `users[]` pour stocker les utilisateurs
- **ID unique** auto-incrémenté pour chaque utilisateur
- **Vérification d'unicité** de l'email lors de l'inscription
- **Validation des identifiants** lors de la connexion

### ✅ **API de Gestion**
- **Inscription** : `POST /signup` - Crée un nouveau compte
- **Connexion** : `POST /signin` - Vérifie les identifiants
- **Liste des utilisateurs** : `GET /api/users/all` - Voir tous les comptes

### ✅ **Données Stockées**
Chaque compte contient :
```javascript
{
    id: 1,                                    // ID unique
    name: "Nom Utilisateur",                  // Nom complet
    email: "email@example.com",              // Email (unique)
    password: "motdepasse",                   // Mot de passe
    avatar: "https://via.placeholder.com/...", // Avatar généré
    bio: "Nouvel utilisateur...",            // Bio par défaut
    followers: 0,                            // Nombre d'abonnés
    following: 0,                            // Nombre d'abonnements
    posts: 0,                               // Nombre de posts
    createdAt: "2025-01-27T10:30:00.000Z"   // Date de création
}
```

## 🚀 **Comment Voir les Comptes Créés**

### **1. Via l'API (Recommandé)**
Ouvrez votre navigateur et allez sur :
```
http://localhost:3000/api/users/all
```

Vous verrez tous les utilisateurs enregistrés au format JSON.

### **2. Via la Console du Serveur**
Quand vous créez un compte, vous verrez dans la console :
```
Nouvel utilisateur créé: { id: 1, name: 'John', email: 'john@example.com' }
Total utilisateurs: 1
```

### **3. Via l'Interface**
- Créez un compte sur `http://localhost:3000`
- Connectez-vous avec vos identifiants
- Accédez au réseau social

## ⚠️ **Limitations Importantes**

### **Stockage Temporaire**
- ❌ **Perte des données** à chaque redémarrage du serveur
- ❌ **Pas de persistance** sur disque
- ❌ **Données volatiles** en mémoire

### **Sécurité**
- ❌ **Mots de passe** stockés en clair (non sécurisé)
- ❌ **Pas de hachage** des mots de passe
- ❌ **Pas de validation** avancée

## 🛠️ **Solutions d'Amélioration**

### **Option 1 : Stockage Fichier JSON**
```javascript
const fs = require('fs');

// Sauvegarder
fs.writeFileSync('users.json', JSON.stringify(users));

// Charger
users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
```

### **Option 2 : Base de Données**
- **SQLite** : `npm install sqlite3`
- **MongoDB** : `npm install mongoose`
- **PostgreSQL** : `npm install pg`

## 📊 **Test du Système**

### **1. Créer un Compte**
1. Allez sur `http://localhost:3000`
2. Cliquez sur "Sign Up"
3. Remplissez : Nom, Email, Mot de passe
4. Cliquez sur "Sign Up"

### **2. Vérifier le Compte**
1. Allez sur `http://localhost:3000/api/users/all`
2. Vous devriez voir votre compte dans la liste

### **3. Se Connecter**
1. Utilisez l'email et mot de passe créés
2. Cliquez sur "Sign In"
3. Redirection automatique vers le réseau social

## 🔍 **Débogage**

### **Problèmes Courants**
- **"Email ou mot de passe incorrect"** : Vérifiez l'email et mot de passe
- **"Compte avec cet email existe déjà"** : Utilisez un autre email
- **Données perdues** : Redémarrage du serveur = perte des données

### **Vérifications**
- **Serveur actif** : `http://localhost:3000`
- **Utilisateurs** : `http://localhost:3000/api/users/all`
- **Logs** : Console du serveur Node.js

## 📈 **Statistiques**

### **Voir le Nombre d'Utilisateurs**
```json
{
    "success": true,
    "users": [...],
    "total": 3  // Nombre total d'utilisateurs
}
```

### **Informations d'un Utilisateur**
```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "followers": 0,
    "following": 0,
    "posts": 0,
    "createdAt": "2025-01-27T10:30:00.000Z"
}
```

## 🎯 **Recommandations**

### **Pour le Développement**
- ✅ **Stockage en mémoire** suffisant pour les tests
- ✅ **API de debug** pour vérifier les données
- ✅ **Logs** pour suivre les créations

### **Pour la Production**
- 🔄 **Base de données** persistante
- 🔐 **Hachage** des mots de passe (bcrypt)
- 🛡️ **Validation** avancée des données
- 🔒 **Sessions** sécurisées (JWT)

---

## 🎉 **Résumé**

**Vos comptes sont maintenant stockés en mémoire dans le serveur !**

**Pour voir tous les utilisateurs** : `http://localhost:3000/api/users/all`

**⚠️ Important** : Les données sont perdues à chaque redémarrage du serveur. Pour une persistance permanente, il faudrait implémenter une base de données.
