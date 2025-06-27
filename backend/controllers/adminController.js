const User = require('../models/User');
const Doctor = require('../models/Doctor');

// ✅ Get All Users (admin-only)
const getAllUsers = async (req, res) => {
  try {
    if (req.user.type !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error in getAllUsers:", error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ✅ Doctor Approval: Update doctor status
const updateDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, message: 'Doctor status updated', doctor });
  } catch (error) {
    console.error("Error in updateDoctorStatus:", error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ✅ Get all pending doctors
const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: 'pending' });
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error in getPendingDoctors:", error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ✅ Get all approved doctors
const getApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: 'approved' });
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error in getApprovedDoctors:", error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateDoctorStatus,
  getPendingDoctors,
  getApprovedDoctors
};
