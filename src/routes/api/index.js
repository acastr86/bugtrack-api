import { Router } from "express";

import auth from "../../utils/auth"

import applications from './applications';
import bugs from './bugs';
import solutions from './solutions';

const router = Router();

router.use(auth.authenticate('local', {session: false}));
router.use('/applications', applications);
router.use('/bugs', bugs);
router.use('/solutions', solutions);

export default router;
