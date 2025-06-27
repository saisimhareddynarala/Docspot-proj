// frontend/js/dashboard.js
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

if (!user || !token) {
  alert('Unauthorized. Please login.');
  window.location.href = 'login.html';
}

document.getElementById('welcomeMsg').innerText = `Welcome to DocSpot Dashboard, ${user.name} (${user.type})`;

if (user.type === 'user' || user.type === 'customer') {
  document.getElementById('userActions').style.display = 'block';
} else if (user.type === 'doctor') {
  document.getElementById('doctorActions').style.display = 'block';
} else if (user.type === 'admin') {
  document.getElementById('adminActions').style.display = 'block';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'login.html';
});
