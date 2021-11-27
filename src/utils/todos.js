import joi from "joi";
import { PrismaClient } from "@prisma/client";

import logger from "./logger";

const db = new PrismaClient();


const todoSchema = joi.object({
    text: joi.string().min(10).required(),
    completed: joi.boolean().required()
});

const idSchema = joi.number().integer().positive().required();

export const getTodos = async (completed = null) => {

    if(completed === null){
        logger.log.success("Getting all todos");
        return await db.todos.findMany();
    }

    logger.log.success('Getting by completion todos');

    const isCompleted = completed === 'true'? true: false;

    return db.todos.findMany({
        where:{
            completed: isCompleted
        }
    });
};

export const getTodo = async (id) => {
    logger.log.info(`Validating id: ${id}`);
    const {error, value} = idSchema.validate(id);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Getting todo with id: ${id}`);
    return await db.todos.findUnique({
        where: {
            id: value
        }
    });
};

export const addTodo = async (todo) => {
    logger.log.info(`Validating ${todo} to add`);
    const {error, value} = todoSchema.validate(todo);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Validated: ${todo}`); 

    const newTodo = await db.todos.create({
        data: {
            ...value
        }
    });

    return {newTodo};
};

export const updateTodo = async (id, todo) => {
    logger.log.info(`Validating ${todo} for update`);
    const {error: todoError, value: todoValue} = todoSchema.validate(todo);

    if (todoError) {
        logger.log.error(new Error(`Validation error: ${todoError.message}`));
        return { error: todoError};
    };
    
    logger.log.info(`Validating id: ${id}`);
    const {error: idError, value: idValue} = idSchema.validate(id);

    if (idError) {
        logger.log.error(new Error(`Validation error: ${idError.message}`));
        return { error: idError};
    }

    logger.log.success('Validated todo and ID ');

    const updatedTodo = await db.todos.update({
        where: {
            id: idValue
        },
        data: {
            ...todoValue
        }
    });
    return {updatedTodo};
};