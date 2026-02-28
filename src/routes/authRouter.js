import express from 'express'
import { changePassword, getUser, login, markUserVerify, resendVerificationMail, sentOtpForResetPass, signup, verifyOtp } from '../controllers/auth.js';
const authRouter = express.Router();
// const checkAuth = require('../middlewares/authMiddleware.js');
// const upload = require('../middlewares/upload.js');



authRouter.post('/signup' , signup);
authRouter.post('/login' , login);
authRouter.get('/markVerify/:token' , markUserVerify);
authRouter.put('/resend-verification-email' , resendVerificationMail);
authRouter.post('/otp-for-reset-password' , sentOtpForResetPass);
authRouter.put('/verify-otp' , verifyOtp);
authRouter.put('/change-password' , changePassword);
authRouter.get('/getUser' , getUser)


export default authRouter