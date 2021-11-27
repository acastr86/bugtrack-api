import { Router } from "express";

import auth from "../../utils/auth"

import todos from './todos';

const router = Router();

router.use(auth.authenticate('local', {session: false}));
router.use('/todos', todos);

export default router;
