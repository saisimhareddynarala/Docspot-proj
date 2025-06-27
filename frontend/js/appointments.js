document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const params = new URLSearchParams(window.location.search);
  const role = params.get('role');

  if (!token || !user) {
    alert("Unauthorized. Please login again.");
    window.location.href = 'login.html';
    return;
  }

  // Routing based on role
  if (role === 'user') {
    getUserAppointments();
  } else if (role === 'doctor') {
    getDoctorAppointments();
  } else if (role === 'book') {
    renderBookingForm();
  }

  // --- GET: User Appointments ---
  async function getUserAppointments() {
    try {
      const res = await fetch('http://localhost:5000/api/appointments/user', { headers });
      const data = await res.json();
      renderAppointments(data.appointments || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching user appointments.");
    }
  }

  // --- GET: Doctor Appointments ---
  async function getDoctorAppointments() {
    try {
      const res = await fetch('http://localhost:5000/api/appointments/doctor', { headers });
      const data = await res.json();
      renderAppointments(data.appointments || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching doctor appointments.");
    }
  }

  // --- RENDER: Appointments List ---
  function renderAppointments(appointments) {
    const container = document.getElementById('appointmentsList');
    container.innerHTML = '';

    if (appointments.length === 0) {
      container.innerHTML = "<p>No appointments found.</p>";
      return;
    }

    appointments.forEach((appt) => {
      const item = document.createElement('div');
      item.innerHTML = `
        <p><strong>Date:</strong> ${appt.date}, <strong>Time:</strong> ${appt.time || 'N/A'}</p>
        <p><strong>Doctor:</strong> ${appt.doctorId?.fullname || appt.doctorId}</p>
        <p><strong>User:</strong> ${appt.userId?.name || appt.userId}</p>
        <hr>
      `;
      container.appendChild(item);
    });
  }

  // --- RENDER: Booking Form ---
  function renderBookingForm() {
    const container = document.getElementById('appointmentsList');
    container.innerHTML = `
      <h3>Book Appointment</h3>
      <form id="appointmentForm">
        <input type="text" id="doctorId" placeholder="Doctor ID" required><br><br>
        <input type="date" id="date" required><br><br>
        <input type="text" id="time" placeholder="Time (e.g. 10:00 AM)" required><br><br>
        <button type="submit">Book</button>
      </form>
    `;

    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const doctorId = document.getElementById('doctorId').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      try {
        const res = await fetch('http://localhost:5000/api/appointments/book', {
          method: 'POST',
          headers,
          body: JSON.stringify({ doctorId, date, time })
        });

        const data = await res.json();
        alert(data.message);
        form.reset();
      } catch (err) {
        console.error("Booking Error:", err);
        alert("Booking failed.");
      }
    });
  }
});
