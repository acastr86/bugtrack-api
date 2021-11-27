import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { addApplication, getApplication, getApplications, updateApplication } from "../../utils/application";


const router = Router();

router.get('/', async (req, res) => {
    const applications = await getApplications();
    
    res.send(applications);
}); 

router.get('/:id', async (req, res, next) => {
    const application = await getApplication(req.params.id);
    if(application) {
        res.send(application);
    } else {
        res.status(StatusCodes.NOT_FOUND);
        next(new Error(`Not Found application with ID: ${req.params.id}`));
    }
});

router.post('/', async (req, res, next) => {
    const application = req.body;
    const response = await addApplication(application);

    if(response.error){
        res.status(StatusCodes.BAD_REQUEST);
        next(response.error);
    } else{
        res.status(StatusCodes.CREATED);
        res.send(response.newApp);
    }
});

router.put('/:id', async (req, res, next) => {
    const application = req.body;
    const response = await updateApplication(req.params.id, application);

    if (response.error) {
        res.status(StatusCodes.BAD_REQUEST);
        next(response.error);
    } else {
        res.status(StatusCodes.OK);
        res.send(response.updatedApp);
    }
});

export default router;