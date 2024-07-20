import { Router } from "express";
import { authLogin, authRegister, createPayment, sendMail } from "../Contorllers/auth.js";

const router = Router();

router.post("/login", authLogin);
router.post("/signup", authRegister);
router.post("/payment", createPayment);
router.post('/send-email', sendMail);

export default router;