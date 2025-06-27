document.getElementById('doctorForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const doctor = {
    fullname: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    specialization: document.getElementById('specialization').value,
    experience: document.getElementById('experience').value,
    fees: document.getElementById('fees').value,
    timings: [
      document.getElementById('timing1').value,
      document.getElementById('timing2').value
    ]
  };

  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:5000/api/doctors/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(doctor)
  });

  const data = await res.json();
  alert(data.message);
});
