import express from 'express';
const router = express.Router();
import {upload} from '../middleware/uploadfile';
import {verifytoken} from "../middleware/verifyToken";
import { verifyUser } from '../middleware/VerifyOtp';
import {userRegister,userLogin,getUserById,updateUser,forgetpassword,userPasswordReset,verifyOTP} from '../controller/userController';

router.post("/register",upload.single('image'),userRegister)
router.post("/verifyOTP",verifyOTP);
router.post("/login",[verifyUser],userLogin)
router.get("/userdetail/:id",verifytoken,getUserById);
router.put('/update',updateUser)
router.post("/forgetpassword",forgetpassword)
router.post("/resetpassword",userPasswordReset)
export default router;