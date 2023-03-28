import express from "express";
const router = express.Router();
import { upload } from '../middleware/uploadfile';
import {sliderUpload,sliderList} from "../controller/sliderController"

router.post("/image/upload",upload.single("sliderimage"),sliderUpload);
router.get("/list",sliderList)
export default router;