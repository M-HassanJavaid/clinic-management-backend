import express from 'express';
import { getAnylatics } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter.get('/anylatics' , getAnylatics);

export default adminRouter