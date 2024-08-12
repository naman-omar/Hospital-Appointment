import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctors, getSingleDoctor, getDoctorProfile} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

import reviewRouter from "../Routes/review.js"

//doctor routes
router.get("/:id",getSingleDoctor);
router.get("/",getAllDoctors);
router.put("/:id", authenticate,restrict(['doctor']),updateDoctor);
router.delete("/:id", authenticate,restrict(['doctor']),deleteDoctor);
router.get("/profile/me", authenticate ,restrict(['doctor']),getDoctorProfile);
//router.delete("/deleteAccount", authenticate,deleteDoctorAccount);

//review routes
router.use("/:doctorId/reviews", reviewRouter);

export default router;