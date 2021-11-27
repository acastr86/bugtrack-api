import joi from "joi";
import { PrismaClient } from "@prisma/client";

import logger from "./logger";

const db = new PrismaClient();


const applicationSchema = joi.object({
    name: joi.string().min(10).required(),
    description: joi.string().required(),
    url: joi.string().uri(),
    type: joi.string().required(),
});

const idSchema = joi.number().integer().positive().required();

export const getApplications = async () => {

    
        logger.log.success("Getting all applications");
        return await db.application.findMany();
};

export const getApplication = async (id) => {
    logger.log.info(`Validating id: ${id}`);
    const {error, value} = idSchema.validate(id);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Getting application with id: ${id}`);
    return await db.application.findUnique({
        where: {
            id: value
        }
    });
};

export const addApplication = async (application) => {
    logger.log.info(`Validating ${application} to add`);
    const {error, value} = applicationSchema.validate(application);

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`));
        return {error};
    }

    logger.log.success(`Validated: ${application}`); 

    const newApp = await db.application.create({
        data: {
            ...value
        }
    });

    return {newApp};
};

export const updateApplication = async (id, application) => {
    logger.log.info(`Validating ${application} for update`);
    const {error: applicationError, value: applicationValue} = applicationSchema.validate(application);

    if (applicationError) {
        logger.log.error(new Error(`Validation error: ${applicationError.message}`));
        return { error: applicationError};
    };
    
    logger.log.info(`Validating id: ${id}`);
    const {error: idError, value: idValue} = idSchema.validate(id);

    if (idError) {
        logger.log.error(new Error(`Validation error: ${idError.message}`));
        return { error: idError};
    }

    logger.log.success('Validated application and ID ');

    const updatedApp = await db.application.update({
        where: {
            id: idValue
        },
        data: {
            ...applicationValue
        }
    });
    return {updatedApp};
};