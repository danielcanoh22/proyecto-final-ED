import express from 'express';
import {
  getRegisters,
  getVehicles,
  getCombinedData,
  getJunctions,
} from '../controllers/client.js';

const router = express.Router();

router.get('/juntionsmonths', getJunctions);
router.get('/traffic', getRegisters);
router.get('/vehicles', getVehicles);
router.get('/vehicleshour', getCombinedData);

export default router;
