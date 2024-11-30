import { Request, Response } from "express";
import { CreateAdoptionRequest, UpdateAdoptionStatus } from "../services/adoptionService";
import { postAdoptionDto } from "../dtos/postAdoption.dto";
import Usuario from "../models/userModel";


export const postAdoption = async (req: Request, res: Response) => {
    const postAdoption: postAdoptionDto = req.body;
    if (!req.user){
        return res.status(403).json({message: 'Usuario no autenticado'})
    }

    const { animal_id } = req.params
    const adopter_id = req.user.id

    try {
        console.log("Datos recibidos en el controlador:", { ...postAdoption, animal_id, adopter_id });
        const adoption = await CreateAdoptionRequest({...postAdoption, animal_id, adopter_id});

        await Usuario.findByIdAndUpdate(adopter_id, {
            $push: { adoptionRequests: adoption._id },
        });

        res.status(202).json({ message: 'was created correctly', adoption });
    } catch (error) {
        res.status(500).json({ message: 'loading error', error });
    }
};

export const putAdoptionStatus = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { status } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'El ID es requerido' });
    }

    if (!status) {
        return res.status(400).json({ message: 'El nuevo estado es requerido' });
    }

    try {
        const updatedAdoption = await UpdateAdoptionStatus(id, status);
        return res.status(200).json({ message: 'Estado actualizado correctamente', adoption: updatedAdoption });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error al actualizar el estado', error: error.message });
        } else {
            return res.status(500).json({ message: 'Error inesperado' });
        }
    }
};