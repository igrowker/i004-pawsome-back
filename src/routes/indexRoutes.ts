import express from 'express';
import animalRoutes from './animalRoutes';
import userRoutes from './userRoutes';
import refugeesRouter from './refugeRoutes';
import adoptionRouter from './adoptionRouter';
import adminRoutes from './adminRoutes';
import volunteerRoutes from './volunteerRouts';
import authRoutes from './authRoutes';
import fileUploadRoutes from './fileUploadRoutes';

const router = express.Router()

router.use("/animals", animalRoutes)
router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/refugees", refugeesRouter);
router.use("/", adoptionRouter)
router.use("/admin", adminRoutes)
router.use("/volunteer", volunteerRoutes)
router.use('/files', fileUploadRoutes);
router.use("/", (req, res) => res.status(200).send("Welcome to Pawsome"))

export default router;