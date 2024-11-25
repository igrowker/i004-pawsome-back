import express from 'express';
import { createRefugee, getRefugees, putRefugeNeeds } from '../controllers/refugeController';

const refugeesRouter = express.Router();

refugeesRouter.get('/', getRefugees);
refugeesRouter.post('/', createRefugee);
refugeesRouter.put('/:id/needs', putRefugeNeeds);

export default refugeesRouter;
