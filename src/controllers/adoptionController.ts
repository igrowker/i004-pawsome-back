import { Request, Response } from "express";
import { CreateAdoptionRequest, UpdateAdoptionStatus } from "../services/adoptionService";
import Animal from "../models/animalModel";
import { postAdoptionDto } from "../dtos/postAdoption.dto";
import Usuario from "../models/userModel";

import mailService from "../services/mailService";

export const postAdoption = async (req: Request, res: Response) => {
    const postAdoption: postAdoptionDto = req.body;

    if (!req.user) {
        return res.status(403).json({ message: 'Usuario no autenticado' });
    }

    const { animal_id } = req.params;
    const adopter_id = req.user.id;
    const useremail = req.user.email;

    if (!animal_id || !adopter_id) {
        return res.status(400).json({ message: 'Faltan datos de identificación del animal o adoptante' });
    }

    try {
        const adoption = await CreateAdoptionRequest({
            ...postAdoption,
            animal_id,
            adopter_id,
        });

        await Usuario.findByIdAndUpdate(adopter_id, {
            $push: { adoptionRequests: adoption._id },
        });

        const animal = await Animal.findById(animal_id).exec();
        console.log("Animal encontrado:", animal);
        
        if (!animal) {
            console.log("Animal no encontrado con ID:", animal_id);
            return res.status(404).json({ message: "Animal no encontrado" });
        }

        const { html } = await mailService.getAdopterEmailTemplate(
            useremail,
            postAdoption,
            animal,
            adoption.status
        );

        const adopterMailOptions = {
            from: process.env.EMAIL_USER,
            to: useremail,
            subject: `Solicitud de adopción recibida para ${animal.name}`,
            html: html
        };

        await mailService.sendEmail(adopterMailOptions);

        res.status(202).json({ message: "Solicitud de adopción creada correctamente y correo enviado", adoption });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error instanceof Error ? error.message : "Error desconocido" });
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
