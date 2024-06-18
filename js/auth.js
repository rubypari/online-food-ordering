document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const isAdmin = localStorage.getItem('isAdmin');
    const user = localStorage.getItem('users');
    const navbar = document.querySelector('.navbar-nav');

    const logoutButton = document.createElement('li');
    logoutButton.classList.add('nav-item');
    logoutButton.innerHTML = `<button id="logout-button" class="btn btn-link nav-link">Logout</button>`;

    const adminButton = document.createElement('li');
    adminButton.classList.add('nav-item');
    adminButton.innerHTML = `<button id="admin-button" class="btn btn-link nav-link">Dashboard</button>`;

    // If user is authenticated
    if (isAuthenticated) {

        //Add Admin Menu
        if(isAdmin){
            navbar.appendChild(adminButton);
        }
        // Admin functionality
        adminButton.addEventListener('click', function() {
            window.location.href = 'list-products.html';
        });

        // Create elements
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        const welcomeMessage = document.createElement('li');
        welcomeMessage.classList.add('nav-item');
        welcomeMessage.innerHTML = `<a class="nav-link">Welcome, ${user.name}</a>`;
        
        // Remove login and register links
        document.querySelector('a[href="login.html"]').parentElement.remove();
        document.querySelector('a[href="register.html"]').parentElement.remove();
        
        // Add Admin-Dashboard, welcome message and logout button
       
        navbar.appendChild(welcomeMessage);
        navbar.appendChild(logoutButton);

         // Logout functionality
         logoutButton.addEventListener('click', function() {
            localStorage.removeItem('isAuthenticated');
            window.location.href = 'login.html';
        });
        
       
    } else {
        // Redirect to login if not on login page
        if (window.location.pathname !== '/login.html') {
            window.location.href = 'login.html';
        }
    }
    
});
