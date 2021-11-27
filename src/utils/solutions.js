import joi from "joi";
import { PrismaClient } from "@prisma/client";

import logger from "./logger";

const db = new PrismaClient();


const solutionSchema = joi.object({
    description: joi.string().required(),
    solvedDate: joi.date().required(),
    solvedBy: joi.string().required(),
    bugID: joi.number().integer().positive().required(),
});

const idSchema = joi.number().integer().positive().required();

export const getSolutions = async () => {

    
        logger.log.success("Getting all solutions");
        return await db.solution.findMany();
};

export const getSolution = async (id) => {
    logger.log.info(`Validating id: ${id}`);
    const {error, value} = idSchema.validate(id);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Getting solution with id: ${id}`);
    return await db.solution.findUnique({
        where: {
            id: value
        }
    });
};

export const addSolution = async (solution) => {
    logger.log.info(`Validating ${solution} to add`);
    const {error, value} = solutionSchema.validate(solution);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Validated: ${solution}`); 

    const newSolution = await db.solution.create({
        data: {
            ...value
        }
    });

    return {newSolution};
};

export const updateSolution = async (id, solution) => {
    logger.log.info(`Validating ${solution} for update`);
    const {error: solutionError, value: solutionValue} = solutionSchema.validate(solution);

    if (solutionError) {
        logger.log.error(new Error(`Validation error: ${solutionError.message}`));
        return { error: solutionError};
    };
    
    logger.log.info(`Validating id: ${id}`);
    const {error: idError, value: idValue} = idSchema.validate(id);

    if (idError) {
        logger.log.error(new Error(`Validation error: ${idError.message}`));
        return { error: idError};
    }

    logger.log.success('Validated solution and ID ');

    const updatedSolution = await db.solution.update({
        where: {
            id: idValue
        },
        data: {
            ...solutionValue
        }
    });
    return {updatedSolution};
};