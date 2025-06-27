const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const { applyDoctorController, getAllDoctorsController } = require("../controllers/doctorController");

const router = express.Router();

router.post("/apply", authMiddleware, applyDoctorController);

// Only admin can get all doctors
router.get("/getAllDoctors", authMiddleware, requireRole("admin"), getAllDoctorsController);

module.exports = router;
