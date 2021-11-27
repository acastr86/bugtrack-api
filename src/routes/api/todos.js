import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { addTodo, getTodo, getTodos, updateTodo } from "../../utils/todos";


const router = Router();

router.get('/', async (req, res) => {
    const todos = await getTodos(req.query.completed);
    
    res.send(todos);
}); 

router.get('/:id', async (req, res, next) => {
    const todo = await getTodo(req.params.id);
    if(todo) {
        res.send(todo);
    } else {
        res.status(StatusCodes.NOT_FOUND);
        next(new Error(`Not Found To do with ID: ${req.params.id}`));
    }
});

router.post('/', async (req, res, next) => {
    const todo = req.body;
    const response = await addTodo(todo);

    if(response.error){
        res.status(StatusCodes.BAD_REQUEST);
        next(response.error);
    } else{
        res.status(StatusCodes.CREATED);
        res.send(response.newTodo);
    }
});

router.put('/:id', async (req, res, next) => {
    const todo = req.body;
    const response = await updateTodo(req.params.id, todo);

    if (response.error) {
        res.status(StatusCodes.BAD_REQUEST);
        next(response.error);
    } else {
        res.status(StatusCodes.OK);
        res.send(response.updatedTodo);
    }
});

export default router;