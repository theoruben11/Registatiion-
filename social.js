// Social Network JavaScript Logic with Dark Mode, Language Support, and Profile Photos
class SocialNetwork {
    constructor() {
        this.currentUser = null;
        this.posts = [];
        this.conversations = [];
        this.users = [];
        this.currentConversation = null;
        this.isDarkMode = false;
        this.currentLanguage = 'en';
        this.translations = {
            en: {
                'nav.home': 'Home',
                'nav.messages': 'Messages',
                'nav.profile': 'Profile',
                'nav.discover': 'Discover',
                'nav.language': 'EN',
                'placeholder.post': "What's on your mind?",
                'post.photo': 'Photo',
                'post.video': 'Video',
                'post.feeling': 'Feeling',
                'post.publish': 'Publish',
                'post.like': 'Like',
                'post.comment': 'Comment',
                'post.share': 'Share',
                'message.placeholder': 'Type your message...',
                'profile.edit': 'Edit Profile',
                'profile.followers': 'Followers',
                'profile.following': 'Following',
                'profile.posts': 'Posts',
                'discover.search': 'Search people...',
                'discover.suggestions': 'Suggestions for you',
                'discover.trending': 'Trending',
                'discover.follow': 'Follow',
                'discover.following': 'Following',
                'notification.success': 'Success!',
                'notification.error': 'Error!',
                'notification.info': 'Info',
                'notification.warning': 'Warning'
            },
            fr: {
                'nav.home': 'Accueil',
                'nav.messages': 'Messages',
                'nav.profile': 'Profil',
                'nav.discover': 'Découvrir',
                'nav.language': 'FR',
                'placeholder.post': 'Quoi de neuf ?',
                'post.photo': 'Photo',
                'post.video': 'Vidéo',
                'post.feeling': 'Humeur',
                'post.publish': 'Publier',
                'post.like': 'J\'aime',
                'post.comment': 'Commenter',
                'post.share': 'Partager',
                'message.placeholder': 'Tapez votre message...',
                'profile.edit': 'Modifier le profil',
                'profile.followers': 'Abonnés',
                'profile.following': 'Abonnements',
                'profile.posts': 'Publications',
                'discover.search': 'Rechercher des personnes...',
                'discover.suggestions': 'Suggestions pour vous',
                'discover.trending': 'Tendances',
                'discover.follow': 'Suivre',
                'discover.following': 'Suivi',
                'notification.success': 'Succès !',
                'notification.error': 'Erreur !',
                'notification.info': 'Info',
                'notification.warning': 'Attention'
            }
        };
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.loadTheme();
        this.loadLanguage();
        this.updateUI();
        this.loadSampleData();
    }

    loadUserData() {
        const userEmail = localStorage.getItem('userEmail');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (userEmail && isLoggedIn) {
            this.currentUser = {
                id: 1,
                name: userEmail.split('@')[0],
                email: userEmail,
                avatar: 'https://via.placeholder.com/150x150/0be2ac/ffffff?text=U',
                bio: 'New social network user',
                followers: 0,
                following: 0,
                posts: 0
            };
        } else {
            window.location.href = '/';
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Language toggle
        document.getElementById('languageToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Avatar upload
        document.getElementById('editAvatarBtn').addEventListener('click', () => {
            document.getElementById('avatarUpload').click();
        });

        document.getElementById('avatarUpload').addEventListener('change', (e) => {
            this.handleAvatarUpload(e);
        });

        // Create post
        document.getElementById('publishPost').addEventListener('click', () => {
            this.createPost();
        });

        document.getElementById('postInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.createPost();
            }
        });

        // Messages
        document.getElementById('sendMessage').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchUsers(e.target.value);
        });

        // Modals
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Profile tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.isDarkMode = savedTheme === 'dark';
            this.applyTheme();
        }
    }

    loadLanguage() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
            this.applyLanguage();
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }

    applyTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        if (this.isDarkMode) {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
        this.applyLanguage();
        localStorage.setItem('language', this.currentLanguage);
    }

    applyLanguage() {
        const languageToggle = document.getElementById('languageToggle');
        const languageSpan = languageToggle.querySelector('span');
        
        if (this.currentLanguage === 'en') {
            languageSpan.textContent = 'EN';
        } else {
            languageSpan.textContent = 'FR';
        }

        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });

        // Update placeholders
        const postInput = document.getElementById('postInput');
        if (postInput) {
            postInput.placeholder = this.translations[this.currentLanguage]['placeholder.post'];
        }

        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.placeholder = this.translations[this.currentLanguage]['message.placeholder'];
        }
    }

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarUrl = e.target.result;
                this.updateUserAvatar(avatarUrl);
            };
            reader.readAsDataURL(file);
        }
    }

    updateUserAvatar(avatarUrl) {
        // Update all avatar images
        document.querySelectorAll('.user-avatar').forEach(img => {
            img.src = avatarUrl;
        });
        
        document.getElementById('profileAvatar').src = avatarUrl;
        document.getElementById('headerUserAvatar').src = avatarUrl;
        document.getElementById('createPostAvatar').src = avatarUrl;

        // Update current user data
        if (this.currentUser) {
            this.currentUser.avatar = avatarUrl;
        }

        this.showNotification('Profile photo updated successfully!', 'success');
    }

    loadSampleData() {
        // Sample users (no posts initially)
        this.users = [
            {
                id: 2,
                name: 'Marie Dubois',
                email: 'marie@example.com',
                avatar: 'https://via.placeholder.com/150x150/ff6b6b/ffffff?text=M',
                bio: 'Passionate developer',
                followers: 150,
                following: 200,
                posts: 0,
                isFollowing: false
            },
            {
                id: 3,
                name: 'Jean Martin',
                email: 'jean@example.com',
                avatar: 'https://via.placeholder.com/150x150/4ecdc4/ffffff?text=J',
                bio: 'Creative designer',
                followers: 300,
                following: 150,
                posts: 0,
                isFollowing: true
            },
            {
                id: 4,
                name: 'Sophie Laurent',
                email: 'sophie@example.com',
                avatar: 'https://via.placeholder.com/150x150/45b7d1/ffffff?text=S',
                bio: 'Amateur photographer',
                followers: 89,
                following: 120,
                posts: 0,
                isFollowing: false
            }
        ];

        // No initial posts - users start with empty feed
        this.posts = [];

        // Sample conversations
        this.conversations = [
            {
                id: 1,
                userId: 2,
                userName: 'Marie Dubois',
                userAvatar: 'https://via.placeholder.com/48x48/ff6b6b/ffffff?text=M',
                lastMessage: 'Hello! How are you?',
                time: '14:30',
                unread: 2
            },
            {
                id: 2,
                userId: 3,
                userName: 'Jean Martin',
                userAvatar: 'https://via.placeholder.com/48x48/4ecdc4/ffffff?text=J',
                lastMessage: 'Thanks for sharing!',
                time: '12:15',
                unread: 0
            }
        ];
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        document.getElementById(sectionName).classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Load specific content
        switch(sectionName) {
            case 'home':
                this.loadPosts();
                break;
            case 'messages':
                this.loadConversations();
                break;
            case 'profile':
                this.loadProfile();
                break;
            case 'discover':
                this.loadDiscover();
                break;
        }
    }

    loadPosts() {
        const postsFeed = document.getElementById('postsFeed');
        postsFeed.innerHTML = '';

        if (this.posts.length === 0) {
            postsFeed.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-newspaper"></i>
                    <h3>No posts yet</h3>
                    <p>Be the first to share something with your network!</p>
                </div>
            `;
            return;
        }

        this.posts.forEach(post => {
            const postElement = this.createPostElement(post);
            postsFeed.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="${post.userAvatar}" alt="${post.userName}" class="user-avatar">
                <div class="post-user-info">
                    <div class="post-user-name">${post.userName}</div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            <div class="post-actions">
                <button class="post-action ${post.isLiked ? 'liked' : ''}" onclick="socialNetwork.toggleLike(${post.id})">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
                <button class="post-action" onclick="socialNetwork.showComments(${post.id})">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </button>
                <button class="post-action" onclick="socialNetwork.sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
        `;
        return postDiv;
    }

    createPost() {
        const postInput = document.getElementById('postInput');
        const content = postInput.value.trim();

        if (!content) {
            this.showNotification('Please write something before publishing', 'error');
            return;
        }

        const newPost = {
            id: Date.now(),
            userId: this.currentUser.id,
            userName: this.currentUser.name,
            userAvatar: this.currentUser.avatar,
            content: content,
            image: null,
            time: 'Just now',
            likes: 0,
            comments: 0,
            isLiked: false
        };

        this.posts.unshift(newPost);
        this.currentUser.posts++;
        this.loadPosts();
        this.updateProfileStats();
        postInput.value = '';

        this.showNotification('Post published successfully!', 'success');
    }

    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            if (post.isLiked) {
                post.likes--;
                post.isLiked = false;
            } else {
                post.likes++;
                post.isLiked = true;
            }
            this.loadPosts();
        }
    }

    showComments(postId) {
        this.showNotification('Comments feature coming soon!', 'info');
    }

    sharePost(postId) {
        this.showNotification('Share feature coming soon!', 'info');
    }

    loadConversations() {
        const conversationsList = document.getElementById('conversationsList');
        conversationsList.innerHTML = '';

        this.conversations.forEach(conversation => {
            const conversationElement = this.createConversationElement(conversation);
            conversationsList.appendChild(conversationElement);
        });

        this.updateMessageBadge();
    }

    createConversationElement(conversation) {
        const conversationDiv = document.createElement('div');
        conversationDiv.className = 'conversation-item';
        conversationDiv.innerHTML = `
            <img src="${conversation.userAvatar}" alt="${conversation.userName}" class="conversation-avatar">
            <div class="conversation-info">
                <div class="conversation-name">${conversation.userName}</div>
                <div class="conversation-last-message">${conversation.lastMessage}</div>
            </div>
            <div class="conversation-time">${conversation.time}</div>
        `;

        conversationDiv.addEventListener('click', () => {
            this.selectConversation(conversation);
        });

        return conversationDiv;
    }

    selectConversation(conversation) {
        this.currentConversation = conversation;
        
        document.getElementById('chatUserName').textContent = conversation.userName;
        document.getElementById('chatUserStatus').textContent = 'Online';
        
        this.loadMessages(conversation.id);
        
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }

    loadMessages(conversationId) {
        const messagesArea = document.getElementById('messagesArea');
        
        const messages = [
            {
                id: 1,
                senderId: 2,
                content: 'Hello! How are you?',
                time: '14:25',
                isSent: false
            },
            {
                id: 2,
                senderId: 1,
                content: 'I\'m doing great! How about you?',
                time: '14:26',
                isSent: true
            },
            {
                id: 3,
                senderId: 2,
                content: 'Very well too! I saw your new post, it\'s awesome!',
                time: '14:30',
                isSent: false
            }
        ];

        messagesArea.innerHTML = '';
        messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesArea.appendChild(messageElement);
        });
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isSent ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <div class="message-content">${message.content}</div>
            <div class="message-time">${message.time}</div>
        `;
        return messageDiv;
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const content = messageInput.value.trim();

        if (!content) {
            return;
        }

        if (!this.currentConversation) {
            this.showNotification('Please select a conversation', 'error');
            return;
        }

        const newMessage = {
            id: Date.now(),
            senderId: this.currentUser.id,
            content: content,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            isSent: true
        };

        const messagesArea = document.getElementById('messagesArea');
        const messageElement = this.createMessageElement(newMessage);
        messagesArea.appendChild(messageElement);
        
        messageInput.value = '';
        messagesArea.scrollTop = messagesArea.scrollHeight;

        this.showNotification('Message sent', 'success');
    }

    loadProfile() {
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileBio').textContent = this.currentUser.bio;
        this.updateProfileStats();
        this.loadUserPosts();
    }

    updateProfileStats() {
        document.getElementById('postsCount').textContent = this.currentUser.posts;
        document.getElementById('followersCount').textContent = this.currentUser.followers;
        document.getElementById('followingCount').textContent = this.currentUser.following;
    }

    loadUserPosts() {
        const userPosts = document.getElementById('userPosts');
        userPosts.innerHTML = '';

        const userPostsData = this.posts.filter(post => post.userId === this.currentUser.id);
        
        if (userPostsData.length === 0) {
            userPosts.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No posts yet</p>';
            return;
        }

        userPostsData.forEach(post => {
            const postElement = this.createPostElement(post);
            userPosts.appendChild(postElement);
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    loadDiscover() {
        this.loadSuggestions();
        this.loadTrending();
    }

    loadSuggestions() {
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';

        this.users.forEach(user => {
            if (user.id !== this.currentUser.id) {
                const suggestionElement = this.createSuggestionElement(user);
                suggestionsList.appendChild(suggestionElement);
            }
        });
    }

    createSuggestionElement(user) {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'suggestion-item';
        suggestionDiv.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}" class="suggestion-avatar">
            <div class="suggestion-info">
                <div class="suggestion-name">${user.name}</div>
                <div class="suggestion-bio">${user.bio}</div>
            </div>
            <button class="follow-btn ${user.isFollowing ? 'following' : ''}" onclick="socialNetwork.toggleFollow(${user.id})">
                ${user.isFollowing ? 'Following' : 'Follow'}
            </button>
        `;
        return suggestionDiv;
    }

    toggleFollow(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            if (user.isFollowing) {
                user.isFollowing = false;
                user.followers--;
                this.currentUser.following--;
            } else {
                user.isFollowing = true;
                user.followers++;
                this.currentUser.following++;
            }
            this.loadSuggestions();
            this.updateProfileStats();
            this.showNotification(user.isFollowing ? 'User followed' : 'User unfollowed', 'success');
        }
    }

    loadTrending() {
        const trendingList = document.getElementById('trendingList');
        const trendingTopics = [
            { topic: '#Development', posts: 1250 },
            { topic: '#Design', posts: 890 },
            { topic: '#Photography', posts: 650 },
            { topic: '#Travel', posts: 1200 },
            { topic: '#Cooking', posts: 450 }
        ];

        trendingList.innerHTML = '';
        trendingTopics.forEach(topic => {
            const topicDiv = document.createElement('div');
            topicDiv.className = 'trending-item';
            topicDiv.innerHTML = `
                <div class="trending-info">
                    <div class="trending-topic">${topic.topic}</div>
                    <div class="trending-posts">${topic.posts} posts</div>
                </div>
            `;
            trendingList.appendChild(topicDiv);
        });
    }

    searchUsers(query) {
        if (query.length < 2) {
            return;
        }

        const filteredUsers = this.users.filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.bio.toLowerCase().includes(query.toLowerCase())
        );

        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';

        if (filteredUsers.length === 0) {
            suggestionsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No results found</p>';
            return;
        }

        filteredUsers.forEach(user => {
            if (user.id !== this.currentUser.id) {
                const suggestionElement = this.createSuggestionElement(user);
                suggestionsList.appendChild(suggestionElement);
            }
        });
    }

    updateMessageBadge() {
        const totalUnread = this.conversations.reduce((sum, conv) => sum + conv.unread, 0);
        document.getElementById('messageBadge').textContent = totalUnread;
    }

    updateUI() {
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('headerUserAvatar').src = this.currentUser.avatar;
        document.getElementById('createPostAvatar').src = this.currentUser.avatar;
        document.getElementById('profileAvatar').src = this.currentUser.avatar;
        
        this.showSection('home');
    }

    showModal(user) {
        document.getElementById('modalUserName').textContent = user.name;
        document.getElementById('modalUserBio').textContent = user.bio;
        document.getElementById('modalFollowers').textContent = `${user.followers} followers`;
        document.getElementById('modalFollowing').textContent = `${user.following} following`;
        
        const followBtn = document.getElementById('followUserBtn');
        followBtn.textContent = user.isFollowing ? 'Following' : 'Follow';
        followBtn.className = `follow-btn ${user.isFollowing ? 'following' : ''}`;
        
        document.getElementById('userModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('userModal').classList.remove('active');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            box-shadow: var(--shadow-lg);
        `;

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };

        notification.style.background = colors[type] || colors.info;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application
const socialNetwork = new SocialNetwork();

// Add animation styles
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

    .empty-state {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--text-secondary);
    }

    .empty-state i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--text-tertiary);
    }

    .empty-state h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }

    .empty-state p {
        font-size: 1rem;
        color: var(--text-secondary);
    }
`;
document.head.appendChild(style);