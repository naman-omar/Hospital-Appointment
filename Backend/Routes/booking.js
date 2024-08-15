import express from "express"
import {authenticate, restrict} from '../auth/verifyToken.js'
import { getAllAppointments, getCheckOutSession, verifyBooking, updateStatus } from "../Controllers/BookingController.js"

const router = express.Router();

router.post('/checkout-session/:doctorId', authenticate, restrict(['patient']), getCheckOutSession);
router.post("/verify", verifyBooking);
router.get("/allAppointments", getAllAppointments);
router.put("/updateStatus/:id", updateStatus);

export default router;