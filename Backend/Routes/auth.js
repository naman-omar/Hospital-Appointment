import express from "express";
import { register, login, loginAdmin, addAdmin } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin", loginAdmin);
router.put("/addAdmin", addAdmin);

export default router;
