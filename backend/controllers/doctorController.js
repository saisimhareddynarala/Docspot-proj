const Doctor = require('../models/Doctor');

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: 'pending' });
    await newDoctor.save();
    res.status(201).send({ success: true, message: 'Doctor application submitted' });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

module.exports = { applyDoctorController, getAllDoctorsController };
