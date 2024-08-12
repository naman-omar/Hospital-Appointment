import express from "express"
import {authenticate, restrict} from '../auth/verifyToken.js'
import { getCheckOutSession, verifyBooking } from "../Controllers/BookingController.js"

const router = express.Router();

router.post('/checkout-session/:doctorId', authenticate, restrict(['patient']), getCheckOutSession);
router.post("/verify", verifyBooking);

export default router;