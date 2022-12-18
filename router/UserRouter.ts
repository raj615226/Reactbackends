import {Router} from 'express';
import { createcontroller, getprofileController, logincontroller, logutController } from '../controller/Usercontroller';
const router=Router();
router.post('/login',logincontroller)
router.post('/logout',logutController)
router.post('/create',createcontroller)
router.post('/get/profile',getprofileController)

export default router;