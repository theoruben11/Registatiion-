# 🌐 Réseau Social - Projet 0

Un réseau social moderne avec des fonctionnalités de contenu, de followers et de messagerie, similaire à Facebook et WhatsApp.

## 🚀 Fonctionnalités

### 📱 Interface Utilisateur
- **Design moderne et responsive** avec une interface intuitive
- **Navigation fluide** entre les différentes sections
- **Thème cohérent** avec des couleurs attrayantes
- **Animations et transitions** pour une expérience utilisateur optimale

### 📝 Gestion du Contenu
- **Création de posts** avec texte et images
- **Feed de contenu** avec posts des utilisateurs suivis
- **Système de likes** et commentaires
- **Partage de contenu** entre utilisateurs
- **Gestion des médias** (photos, vidéos)

### 👥 Système Social
- **Profils utilisateurs** complets avec photos et informations
- **Système de followers** (suivre/ne plus suivre)
- **Recherche d'utilisateurs** avec suggestions intelligentes
- **Statistiques de profil** (posts, followers, abonnements)
- **Découverte de nouveaux utilisateurs**

### 💬 Messagerie
- **Chat en temps réel** avec interface WhatsApp-like
- **Conversations multiples** avec liste des contacts
- **Envoi de messages** instantanés
- **Notifications de nouveaux messages**
- **Interface de chat moderne** avec bulles de messages

### 🔔 Notifications
- **Système de notifications** pour les interactions
- **Badges de notification** sur les icônes
- **Alertes visuelles** pour les nouvelles activités

## 🛠️ Technologies Utilisées

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Node.js avec Express
- **Styling**: CSS moderne avec Flexbox et Grid
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Inter)

## 📁 Structure du Projet

```
projet 0/
├── social.html          # Page principale du réseau social
├── social.css           # Styles pour le réseau social
├── social.js            # Logique JavaScript du réseau social
├── server.js            # Serveur Node.js avec API
├── index.html           # Page de connexion/inscription
├── dashboard.html       # Ancien dashboard (toujours disponible)
├── style.css            # Styles pour la page de connexion
├── script.js            # Script de connexion
└── package.json         # Dépendances du projet
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (gestionnaire de paquets)

### Installation
1. **Cloner ou télécharger le projet**
2. **Installer les dépendances** :
   ```bash
   npm install
   ```

### Démarrage
1. **Démarrer le serveur** :
   ```bash
   npm start
   ```
   ou
   ```bash
   node server.js
   ```

2. **Ouvrir le navigateur** et aller sur :
   ```
   http://localhost:3000
   ```

## 📖 Guide d'Utilisation

### 🔐 Connexion
1. **Accédez à la page d'accueil** (`http://localhost:3000`)
2. **Créez un compte** ou **connectez-vous** avec vos identifiants
3. **Vous serez automatiquement redirigé** vers le réseau social

### 🏠 Page d'Accueil
- **Créez des posts** en tapant dans la zone de texte
- **Publiez du contenu** avec le bouton "Publier"
- **Interagissez** avec les posts (likes, commentaires, partage)
- **Consultez le feed** des utilisateurs que vous suivez

### 💬 Messagerie
- **Cliquez sur "Messages"** dans la navigation
- **Sélectionnez une conversation** dans la liste de gauche
- **Envoyez des messages** dans la zone de chat
- **Interface similaire à WhatsApp** pour une expérience familière

### 👤 Profil
- **Consultez votre profil** avec vos statistiques
- **Modifiez vos informations** personnelles
- **Gérez vos posts** et photos
- **Vérifiez vos followers** et abonnements

### 🔍 Découverte
- **Recherchez des utilisateurs** par nom ou bio
- **Découvrez de nouveaux contacts** dans les suggestions
- **Suivez des utilisateurs** intéressants
- **Explorez les tendances** du réseau

## 🎨 Personnalisation

### Couleurs du Thème
Le réseau social utilise une palette de couleurs moderne :
- **Couleur principale** : `#0be2ac` (vert turquoise)
- **Couleur secondaire** : `#1a7f66` (vert foncé)
- **Arrière-plan** : `#f8fafc` (gris clair)
- **Texte** : `#1e293b` (gris foncé)

### Modification des Styles
- **Éditez `social.css`** pour personnaliser l'apparence
- **Modifiez les couleurs** dans les variables CSS
- **Ajustez la responsivité** pour différents écrans

## 🔧 API Endpoints

Le serveur expose plusieurs endpoints pour le réseau social :

### Posts
- `GET /api/posts` - Récupérer tous les posts
- `POST /api/posts` - Créer un nouveau post

### Utilisateurs
- `GET /api/users` - Récupérer la liste des utilisateurs
- `GET /api/users/search?q=query` - Rechercher des utilisateurs
- `POST /api/users/:id/follow` - Suivre/ne plus suivre un utilisateur

### Messages
- `GET /api/conversations` - Récupérer les conversations
- `GET /api/conversations/:id/messages` - Récupérer les messages d'une conversation
- `POST /api/conversations/:id/messages` - Envoyer un message

## 📱 Responsive Design

Le réseau social est entièrement responsive et s'adapte à tous les écrans :
- **Desktop** : Interface complète avec sidebar
- **Tablet** : Navigation adaptée avec menu compact
- **Mobile** : Interface optimisée pour les petits écrans

## 🚀 Fonctionnalités Avancées

### Système de Notifications
- **Notifications en temps réel** pour les interactions
- **Badges de notification** sur les icônes de navigation
- **Alertes visuelles** pour les nouveaux messages

### Gestion des Données
- **Stockage local** des données utilisateur
- **Persistance** des sessions de connexion
- **Gestion des états** de l'application

### Interface Utilisateur
- **Animations fluides** pour les transitions
- **Feedback visuel** pour les interactions
- **Design moderne** avec Material Design inspirations

## 🔮 Améliorations Futures

### Fonctionnalités Prévues
- **Chat en temps réel** avec WebSockets
- **Upload d'images** et de fichiers
- **Système de groupes** et communautés
- **Notifications push** pour mobile
- **Base de données** persistante (MongoDB/PostgreSQL)
- **Authentification** sécurisée avec JWT
- **API REST** complète
- **Tests unitaires** et d'intégration

### Optimisations Techniques
- **Lazy loading** pour les images
- **Pagination** pour les listes longues
- **Cache** pour les données fréquentes
- **Compression** des assets
- **CDN** pour les ressources statiques

## 📞 Support

Pour toute question ou problème :
1. **Vérifiez la console** du navigateur pour les erreurs
2. **Consultez les logs** du serveur Node.js
3. **Vérifiez la connexion** à l'API
4. **Redémarrez le serveur** si nécessaire

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer selon vos besoins.

---

**🎉 Profitez de votre nouveau réseau social !**

Connectez-vous, créez du contenu, suivez des utilisateurs et échangez des messages dans un environnement moderne et intuitif.
