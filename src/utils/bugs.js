import joi from "joi";
import { PrismaClient } from "@prisma/client";

import logger from "./logger";

const db = new PrismaClient();


const bugSchema = joi.object({
    name: joi.string().min(10).required(),
    description: joi.string().required(),
    status: joi.string().required(),
    priority: joi.number().integer().positive().required(),
    reportedDate: joi.date().required(),
    reportedBy: joi.string().required(),
    appID: joi.number().integer().positive().required(),
});

const idSchema = joi.number().integer().positive().required();

export const getBugs = async () => {

    
        logger.log.success("Getting all bugs");
        return await db.bug.findMany();
};

export const getBug = async (id) => {
    logger.log.info(`Validating id: ${id}`);
    const {error, value} = idSchema.validate(id);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Getting bug with id: ${id}`);
    return await db.bug.findUnique({
        where: {
            id: value
        }
    });
};

export const addBug = async (bug) => {
    logger.log.info(`Validating ${bug} to add`);
    const {error, value} = bugSchema.validate(bug);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Validated: ${bug}`); 

    const newBug = await db.bug.create({
        data: {
            ...value
        }
    });

    return {newBug};
};

export const updateBug = async (id, bug) => {
    logger.log.info(`Validating ${bug} for update`);
    const {error: bugError, value: bugValue} = bugSchema.validate(bug);

    if (bugError) {
        logger.log.error(new Error(`Validation error: ${bugError.message}`));
        return { error: bugError};
    };
    
    logger.log.info(`Validating id: ${id}`);
    const {error: idError, value: idValue} = idSchema.validate(id);

    if (idError) {
        logger.log.error(new Error(`Validation error: ${idError.message}`));
        return { error: idError};
    }

    logger.log.success('Validated bug and ID ');

    const updatedBug = await db.bug.update({
        where: {
            id: idValue
        },
        data: {
            ...bugValue
        }
    });
    return {updatedBug};
};