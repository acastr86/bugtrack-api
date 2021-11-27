import { Router } from "express";

import auth from "../../utils/auth"

import applications from './applications';

const router = Router();

router.use(auth.authenticate('local', {session: false}));
router.use('/applications', applications);

export default router;
