import { Request, Response } from "express";
import { CreateAdoptionRequest } from "../services/adoptionService";
import { postAdoptionDto } from "../dtos/postAdoption.dto";


export const postAdoption = async (req: Request, res: Response) => {
    const postAdoption: postAdoptionDto = req.body;

    try {
        const adoption = await CreateAdoptionRequest(postAdoption);

        res.status(202).json({ message: 'was created correctly', adoption });
    } catch (error) {
        res.status(500).json({ message: 'loading error', error });
    }
}