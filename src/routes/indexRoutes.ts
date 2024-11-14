import express from 'express';
import animalRoutes from './animalRoutes';
import userRoutes from './userRoutes';

const router = express.Router()

router.use("/animals", animalRoutes)
router.use("/auth", userRoutes) 
router.use("/", (req, res) => res.status(200).send("Welcome to Pawsome"))

export default router;