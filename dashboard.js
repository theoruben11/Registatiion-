// Gestion de la page dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer l'email de l'utilisateur depuis le localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('userEmail').textContent = userEmail;
    }

    // Gestion du bouton de déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Supprimer les données de session
            localStorage.removeItem('userEmail');
            localStorage.removeItem('isLoggedIn');
            
            // Rediriger vers la page de connexion
            window.location.href = '/';
        });
    }

    // Gestion des boutons des cartes
    const statBtns = document.querySelectorAll('.stat-btn');
    statBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cardTitle = this.closest('.stat-card').querySelector('h3').textContent;
            
            switch(cardTitle) {
                case 'Profil':
                    showNotification('Fonctionnalité profil en cours de développement');
                    break;
                case 'Paramètres':
                    showNotification('Fonctionnalité paramètres en cours de développement');
                    break;
                case 'Statistiques':
                    showNotification('Fonctionnalité statistiques en cours de développement');
                    break;
                case 'Notifications':
                    showNotification('Fonctionnalité notifications en cours de développement');
                    break;
                default:
                    showNotification('Fonctionnalité en cours de développement');
            }
        });
    });

    // Fonction pour afficher des notifications
    function showNotification(message) {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0be2ac;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Rediriger vers la page de connexion si pas connecté
        window.location.href = '/';
    }
});
