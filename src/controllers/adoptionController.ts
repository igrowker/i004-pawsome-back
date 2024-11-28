import { Request, Response } from "express";
import { CreateAdoptionRequest } from "../services/adoptionService";
import { postAdoptionDto } from "../dtos/postAdoption.dto";


export const postAdoption = async (req: Request, res: Response) => {
    const postAdoption: postAdoptionDto = req.body;
    if (!req.user){
        return res.status(403).json({message: 'Usuario no autenticado'})
    }

    const { animal_id } = req.params
    const adopter_id = req.user.id

    try {
        const adoption = await CreateAdoptionRequest({...postAdoption, animal_id, adopter_id});

        res.status(202).json({ message: 'was created correctly', adoption });
    } catch (error) {
        res.status(500).json({ message: 'loading error', error });
    }
}