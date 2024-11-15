import express from 'express';
import animalRoutes from './animalRoutes';
import userRoutes from './userRoutes';
import volunteers from './volunteerRouts';
import admin from './adminRoutes';

const router = express.Router()

router.use("/animals", animalRoutes)
router.use("/auth", userRoutes)
router.use("/volunteers",volunteers)
router.use('/admin', admin);
router.use("/", (req, res) => res.status(200).send("Welcome to Pawsome"))

export default router;