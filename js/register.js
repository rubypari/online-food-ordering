document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

     // Hash the password
     const hashedPassword = CryptoJS.SHA256(password).toString();

    // Retrieve user data from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (users.some(u => u.email === email)) {
        alert('User already exists with this email.');
        return;
    }

     // Add new user with hashed password
    users.push({ name, email, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));

     alert('Registration successful!');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('loggedInUser', JSON.stringify({ name, email, password: hashedPassword }));
    // Redirect to home page
    window.location.href = 'index.html';

});
