const API_BASE = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

// Utility headers
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// 🔹 Get All Users
document.getElementById('getAllUsersBtn')?.addEventListener('click', async () => {
  const res = await fetch(`${API_BASE}/admin/getAllUsers`, { headers });
  const data = await res.json();
  console.log("All Users:", data.users);
  document.getElementById('output').innerText = JSON.stringify(data.users, null, 2);
});

// 🔹 Update Doctor Status (Approve / Reject)
document.getElementById('updateDoctorBtn')?.addEventListener('click', async () => {
  const doctorId = document.getElementById('doctorId').value;
  const status = document.getElementById('status').value;

  const res = await fetch(`${API_BASE}/admin/updateDoctorStatus`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ doctorId, status })
  });

  const data = await res.json();
  console.log("Update Result:", data);
  alert(data.message);
  getDoctorsByStatus('pending'); // refresh pending list if needed
});

// ✅ Get Pending Doctors
document.getElementById('getPendingDoctorsBtn')?.addEventListener('click', async () => {
  getDoctorsByStatus('pending');
});

// ✅ Get Approved Doctors
document.getElementById('getApprovedDoctorsBtn')?.addEventListener('click', async () => {
  getDoctorsByStatus('approved');
});

// ✅ Fetch Doctors by Status & Render
const getDoctorsByStatus = async (status) => {
  const res = await fetch(`${API_BASE}/doctors/${status}`, { headers });
  const data = await res.json();
  renderDoctors(data.doctors || []);
};

// ✅ Approve/Reject Doctor by ID
const updateStatus = async (doctorId, status) => {
  const res = await fetch(`${API_BASE}/admin/updateDoctorStatus`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ doctorId, status })
  });

  const result = await res.json();
  alert(result.message || 'Status updated');
  getDoctorsByStatus('pending');
};

// ✅ Render doctors list dynamically
function renderDoctors(doctors) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (!doctors.length) {
    output.innerHTML = '<p>No doctors found.</p>';
    return;
  }

  doctors.forEach(doc => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${doc.fullname}</strong> (${doc.specialization}) - Status: <b>${doc.status}</b></p>
      ${doc.status === 'pending' ? `
        <button onclick="updateStatus('${doc._id}', 'approved')">Approve</button>
        <button onclick="updateStatus('${doc._id}', 'rejected')">Reject</button>
      ` : ''}
      <hr/>
    `;
    output.appendChild(div);
  });
}

// Expose updateStatus globally for dynamic button use
window.updateStatus = updateStatus;
