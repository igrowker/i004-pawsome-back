import { Request, Response } from "express";
import { CreateAdoptionRequest } from "../services/adoptionService";


export const postAdoption = async (req: Request, res: Response) => {
    const postAdoption = req.body;

    try {
        const adoption = await CreateAdoptionRequest(postAdoption);

        res.status(202).json({ message: 'was created correctly', adoption });
    } catch (error) {
        res.status(500).json({ message: 'loading error', error });
    }
}