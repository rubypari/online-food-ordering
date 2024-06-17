document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

     // Hash the input password
     const hashedPassword = CryptoJS.SHA256(password).toString();

    // Retrieve user data from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (user) {
        alert('Login successful!');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        // Redirect to home page
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password.');
    }
});
