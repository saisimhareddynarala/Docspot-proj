document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const list = document.getElementById("doctorAppointmentsList");

  try {
    const res = await fetch(`http://localhost:5000/api/appointments/doctor/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const appointments = await res.json();
    list.innerHTML = "";

    if (appointments.length === 0) {
      list.innerHTML = "<li>No appointments yet.</li>";
    }

    appointments.forEach((appt) => {
      const li = document.createElement("li");
      li.textContent = `Patient ID: ${appt.userId}, Date: ${new Date(appt.date).toLocaleString()}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching appointments", error);
  }
});
