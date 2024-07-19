import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDoctorProfile } from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

import reviewRouter from "../Routes/review.js"

router.get("/:doctorId/reviews", authenticate, reviewRouter);
router.get("/:id", authenticate,restrict(['doctor']),getSingleDoctor);
router.get("/",getAllDoctor);
router.put("/:id", authenticate,restrict(['doctor']),updateDoctor);
router.delete("/:id", authenticate,restrict(['doctor']),deleteDoctor);
router.get("/profile/me", authenticate,restrict(['doctor']),getDoctorProfile);

export default router;