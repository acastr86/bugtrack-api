import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { addSolution, getSolution, getSolutions, updateSolution } from "../../utils/solutions";


const router = Router();

router.get('/', async (req, res) => {
    const solutions = await getSolutions();
    
    res.send(solutions);
}); 

router.get('/:id', async (req, res, next) => {
    const solution = await getSolution(req.params.id);
    if(solution) {
        res.send(solution);
    } else {
        res.status(StatusCodes.NOT_FOUND);
        next(new Error(`Not Found solution with ID: ${req.params.id}`));
    }
});

router.post('/', async (req, res, next) => {
    const solution = req.body;
    const response = await addSolution(solution);

    if(response.error){
        res.status(StatusCodes.BAD_REQUEST);
        next(response.error);
    } else{
        res.status(StatusCodes.CREATED);
        res.send(response.newSolution);
    }
});

router.put('/:id', async (req, res, next) => {
    const solution = req.body;
    const response = await updateSolution(req.params.id, solution);

    if (response.error) {
        res.status(StatusCodes.BAD_REQUEST);
        next(response.error);
    } else {
        res.status(StatusCodes.OK);
        res.send(response.updatedSolution);
    }
});

export default router;