const express = require('express');
const {
  getAllUsers,
  updateDoctorStatus,
  getPendingDoctors,
  getApprovedDoctors
} = require('../controllers/adminController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Get all users (admin only)
router.get('/getAllUsers', authMiddleware, verifyAdmin, getAllUsers);

// ✅ Update doctor approval status (admin only)
router.post('/updateDoctorStatus', authMiddleware, verifyAdmin, updateDoctorStatus);

// ✅ Get all pending doctors
router.get('/pending-doctors', authMiddleware, verifyAdmin, getPendingDoctors);

// ✅ Get all approved doctors
router.get('/approved-doctors', authMiddleware, verifyAdmin, getApprovedDoctors);

module.exports = router;
