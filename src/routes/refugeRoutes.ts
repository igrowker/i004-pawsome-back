import express from 'express';
import { getRefugees, putRefugeNeeds } from '../controllers/refugeController';

const refugeesRouter = express.Router();

refugeesRouter.get('/', getRefugees);
refugeesRouter.put('/:id/needs', putRefugeNeeds);

export default refugeesRouter;
