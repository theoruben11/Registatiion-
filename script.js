const container = document.getElementById('container');
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');

// Gestion des animations du formulaire
if (container && signUpBtn && signInBtn) {
  signUpBtn.onclick = () => container.classList.add('right-panel-active');
  signInBtn.onclick = () => container.classList.remove('right-panel-active');
}

// Gestion des formulaires
document.addEventListener('DOMContentLoaded', function() {
  // Formulaire d'inscription
  const signUpForm = document.querySelector('.sign-up-container form');
  if (signUpForm) {
    signUpForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(signUpForm);
      const userData = {
        name: formData.get('name') || signUpForm.querySelector('input[type="text"]').value,
        email: formData.get('email') || signUpForm.querySelector('input[type="email"]').value,
        password: formData.get('password') || signUpForm.querySelector('input[type="password"]').value
      };
      
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        alert(result.message);
        
        if (result.success) {
          signUpForm.reset();
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'inscription');
      }
    });
  }
  
  // Formulaire de connexion
  const signInForm = document.querySelector('.sign-in-container form');
  if (signInForm) {
    signInForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(signInForm);
      const userData = {
        email: formData.get('email') || signInForm.querySelector('input[type="email"]').value,
        password: formData.get('password') || signInForm.querySelector('input[type="password"]').value
      };
      
      try {
        const response = await fetch('/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        alert(result.message);
        
        if (result.success) {
          // Sauvegarder les informations de connexion
          localStorage.setItem('userEmail', userData.email);
          localStorage.setItem('isLoggedIn', 'true');
          
          // Rediriger vers le dashboard
          if (result.redirect) {
            window.location.href = result.redirect;
          } else {
            window.location.href = '/dashboard.html';
          }
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la connexion');
      }
    });
  }
});