import express from 'express';
const router = express.Router();
import {addOrder,orderDetailById,UpdateOrder,orderHistory} from "../controller/orderController"

router.post("/addorder",addOrder);
router.get("/orderdetail/:id",orderDetailById);
router.put("/updateorder",UpdateOrder);
router.get("/history",orderHistory)

export default router;