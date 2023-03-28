import  express from 'express';
const router = express.Router();
import {Contact} from '../controller/contactController'

router.post("/add",Contact);
export default router;