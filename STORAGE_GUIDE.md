# 💾 Guide de Stockage des Comptes

## 🔍 **Où sont Stockés les Comptes**

### 📍 **Situation Actuelle**
Les comptes sont maintenant stockés **en mémoire** dans le serveur Node.js.

### 🗂️ **Localisation du Stockage**

#### **Dans le Code Serveur** (`server.js`)
```javascript
// Stockage en mémoire des utilisateurs
let users = [];
let nextUserId = 1;
```

#### **Structure des Données**
```javascript
{
    id: 1,
    name: "Nom Utilisateur",
    email: "email@example.com",
    password: "motdepasse", // ⚠️ Non hasché (à améliorer)
    avatar: "https://via.placeholder.com/150x150/0be2ac/ffffff?text=N",
    bio: "Nouvel utilisateur du réseau social",
    followers: 0,
    following: 0,
    posts: 0,
    createdAt: "2025-01-27T10:30:00.000Z"
}
```

## 🔧 **Fonctionnalités Ajoutées**

### ✅ **Inscription Sécurisée**
- **Vérification** de l'unicité de l'email
- **Création automatique** d'un avatar
- **Génération d'ID** unique
- **Horodatage** de création

### ✅ **Connexion Validée**
- **Vérification** des identifiants
- **Messages d'erreur** appropriés
- **Retour des données** utilisateur

### ✅ **API de Debug**
- **Route** `/api/users/all` pour voir tous les utilisateurs
- **Comptage** du nombre total d'utilisateurs

## 🚀 **Comment Tester**

### **1. Créer un Compte**
1. Allez sur `http://localhost:3000`
2. Cliquez sur "Sign Up"
3. Remplissez le formulaire
4. Le compte est créé et stocké

### **2. Voir les Comptes Créés**
1. Allez sur `http://localhost:3000/api/users/all`
2. Vous verrez tous les utilisateurs enregistrés
3. Format JSON avec toutes les informations

### **3. Se Connecter**
1. Utilisez l'email et mot de passe créés
2. La connexion vérifie les identifiants
3. Redirection vers le réseau social

## ⚠️ **Limitations Actuelles**

### **Stockage Temporaire**
- ❌ **Perte des données** à chaque redémarrage du serveur
- ❌ **Pas de persistance** sur disque
- ❌ **Mots de passe** non sécurisés (non haschés)

### **Sécurité**
- ❌ **Mots de passe** en clair
- ❌ **Pas de validation** avancée
- ❌ **Pas de session** sécurisée

## 🛠️ **Solutions d'Amélioration**

### **Option 1 : Stockage Fichier JSON**
```javascript
const fs = require('fs');

// Sauvegarder dans un fichier
fs.writeFileSync('users.json', JSON.stringify(users));

// Charger depuis un fichier
users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
```

### **Option 2 : Base de Données SQLite**
```bash
npm install sqlite3
```

### **Option 3 : Base de Données MongoDB**
```bash
npm install mongoose
```

### **Option 4 : Base de Données PostgreSQL**
```bash
npm install pg
```

## 📊 **Statistiques en Temps Réel**

### **Voir les Utilisateurs**
- **URL** : `http://localhost:3000/api/users/all`
- **Format** : JSON
- **Données** : Tous les utilisateurs avec leurs informations

### **Exemple de Réponse**
```json
{
    "success": true,
    "users": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "avatar": "https://via.placeholder.com/150x150/0be2ac/ffffff?text=J",
            "followers": 0,
            "following": 0,
            "posts": 0,
            "createdAt": "2025-01-27T10:30:00.000Z"
        }
    ],
    "total": 1
}
```

## 🔄 **Cycle de Vie des Données**

### **Démarrage du Serveur**
1. **Tableau vide** `users = []`
2. **ID suivant** `nextUserId = 1`
3. **Prêt** à recevoir de nouveaux utilisateurs

### **Création d'Utilisateur**
1. **Vérification** de l'unicité de l'email
2. **Création** de l'objet utilisateur
3. **Ajout** au tableau `users`
4. **Incrémentation** de `nextUserId`

### **Connexion d'Utilisateur**
1. **Recherche** dans le tableau `users`
2. **Vérification** email + mot de passe
3. **Retour** des données utilisateur

### **Redémarrage du Serveur**
1. **Perte** de toutes les données
2. **Retour** à l'état initial
3. **Nouveaux utilisateurs** à recréer

## 🎯 **Recommandations**

### **Pour le Développement**
- ✅ **Stockage en mémoire** suffisant pour les tests
- ✅ **API de debug** pour vérifier les données
- ✅ **Logs** dans la console du serveur

### **Pour la Production**
- 🔄 **Base de données** persistante
- 🔐 **Hachage** des mots de passe
- 🛡️ **Validation** avancée des données
- 🔒 **Sessions** sécurisées

## 📞 **Support**

### **Vérifier les Utilisateurs**
1. **Console du serveur** : Logs des créations/connexions
2. **API** : `http://localhost:3000/api/users/all`
3. **Réseau social** : Données utilisateur dans l'interface

### **Débogage**
- **Erreurs de connexion** : Vérifiez l'email et mot de passe
- **Comptes perdus** : Redémarrage du serveur = perte des données
- **Données** : Consultez `/api/users/all` pour voir l'état actuel

---

**💾 Vos comptes sont maintenant stockés en mémoire !**

**Pour voir tous les utilisateurs** : `http://localhost:3000/api/users/all`
