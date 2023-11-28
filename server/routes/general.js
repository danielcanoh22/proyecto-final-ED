import express from 'express';
import { getRegistersWithMaxVehicles } from '../controllers/general.js';

const router = express.Router();

router.get('/dashboard', getRegistersWithMaxVehicles);

export default router;
