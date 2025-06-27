// Handle user registration
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    password: document.getElementById('password').value
  };

  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  const data = await res.json();
  alert(data.message);
});

// Handle login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login successful!');
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login Error:', err);
    alert('Something went wrong while logging in.');
  }
});
