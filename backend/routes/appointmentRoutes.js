const express = require('express');
const router = express.Router();

const {
  bookAppointmentController,
  getUserAppointments,
  getDoctorAppointments
} = require('../controllers/appointmentController');

const { authMiddleware } = require('../middleware/authMiddleware');

// Book an appointment (protected route)
router.post('/book', authMiddleware, bookAppointmentController);

// Get appointments for logged-in user
router.get('/user', authMiddleware, getUserAppointments);

// Get appointments for logged-in doctor
router.get('/doctor', authMiddleware, getDoctorAppointments);

module.exports = router;
