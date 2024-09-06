document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePassword(password)) {
        alert('Please enter a valid password.');
        return;
    }

    signInUser(email, password);
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePassword(password)) {
        alert('Please enter a valid password.');
        return;
    }

    registerUser(name, email, password);
});

document.getElementById('registerLink').addEventListener('click', function() {
    document.getElementById('signInForm').classList.add('d-none');
    document.getElementById('registerForm').classList.remove('d-none');
});

document.getElementById('signInLink').addEventListener('click', function() {
    document.getElementById('registerForm').classList.add('d-none');
    document.getElementById('signInForm').classList.remove('d-none');
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.length >= 6; // Example validation rule
}

function signInUser(email, password) {
    fetch('/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/success.html';
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function registerUser(name, email, password) {
    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful! Please sign in.');
            document.getElementById('registerForm').classList.add('d-none');
            document.getElementById('signInForm').classList.remove('d-none');
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
