import express from 'express';
import multer from 'multer';
import { upload } from '../middleware/uploadfile';
import { addProduct,productList,getProductThroughId,payment,searchProduct} from '../controller/productController';
const router = express.Router();

router.post("/add",upload.single('image'),addProduct);
router.get("/list",productList)
router.get("/throughid/:id",getProductThroughId)


//------------------>>>>> Payment <<<<<--------------------
router.post("/payment",payment)


//------------------>>>>> Payment <<<<<--------------------
router.post("/search",searchProduct)
export default router
