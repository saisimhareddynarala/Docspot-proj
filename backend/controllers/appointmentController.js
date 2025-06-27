const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Book appointment
const bookAppointmentController = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newAppointment = new Appointment({
      userId: req.user.id,   // comes from authMiddleware
      doctorId,
      date,
      time
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error("Book Error:", error.message);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

// Get appointments by user
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate('doctorId', 'fullname email specialization');

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

// Get appointments for doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate('userId', 'name email');

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

module.exports = {
  bookAppointmentController,
  getUserAppointments,
  getDoctorAppointments
};
