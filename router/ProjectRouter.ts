import {Router} from 'express';
import { appliedProjectController, createProjectController, getProjectController, viewappliedProjectController } from '../controller/Projectcontroller';
import { userAuth } from '../middleware/auth';

const router=Router();
router.get('/get',getProjectController)
router.post('/get/project',createProjectController)
router.post('/view',userAuth,viewappliedProjectController)
router.post('/get/applied',appliedProjectController)

export default router;