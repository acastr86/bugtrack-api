import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { addBug, getBug, getBugs, updateBug } from "../../utils/bugs";


const router = Router();

router.get('/', async (req, res) => {
    const bugs = await getBugs();
    
    res.send(bugs);
}); 

router.get('/:id', async (req, res, next) => {
    const bug = await getBug(req.params.id);
    if(bug) {
        res.send(bug);
    } else {
        res.status(StatusCodes.NOT_FOUND);
        next(new Error(`Not Found bug with ID: ${req.params.id}`));
    }
});

router.post('/', async (req, res, next) => {
    const bug = req.body;
    const response = await addBug(bug);

    if(response.error){
        res.status(StatusCodes.BAD_REQUEST);
        next(response.error);
    } else{
        res.status(StatusCodes.CREATED);
        res.send(response.newBug);
    }
});

router.put('/:id', async (req, res, next) => {
    const bug = req.body;
    const response = await updateBug(req.params.id, bug);

    if (response.error) {
        res.status(StatusCodes.BAD_REQUEST);
        next(response.error);
    } else {
        res.status(StatusCodes.OK);
        res.send(response.updatedBug);
    }
});

export default router;