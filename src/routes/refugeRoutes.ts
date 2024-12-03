import express from 'express';
import { getRefugees, putRefugeNeeds, getRefugeeById  } from '../controllers/refugeController';
import { authenticateToken } from '../middlewares/authMiddleware';

const refugeesRouter = express.Router();

refugeesRouter.get('/', getRefugees);
refugeesRouter.put('/:id/needs', putRefugeNeeds);
refugeesRouter.get('/:id', getRefugeeById);

export default refugeesRouter;
