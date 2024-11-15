import express from 'express';
import animalRoutes from './animalRoutes';
import userRoutes from './userRoutes';
import refugeesRouter from './refugeRoutes';
import adoptionRouter from './adoptionRouter';

const router = express.Router()

router.use("/animals", animalRoutes)
router.use("/auth", userRoutes)
router.use("/refugees", refugeesRouter)
router.use("/", adoptionRouter)
router.use("/", (req, res) => res.status(200).send("Welcome to Pawsome"))

export default router;