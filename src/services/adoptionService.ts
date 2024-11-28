import { postAdoptionDto } from "../dtos/postAdoption.dto";
import AdoptionRequests from "../models/adoptionRequests"

export const CreateAdoptionRequest = async (adop: postAdoptionDto) => {
    const newAdoption = await AdoptionRequests.create(adop);

    if (!newAdoption) {
        throw new Error("La solicitud no se completo correctamente")
    }

    return newAdoption;
};

export const UpdateAdoptionStatus = async (id: string, status: string) => {
    const requestToUpdate = await AdoptionRequests.findById(id);

    if (!requestToUpdate) {
        throw new Error('Solicitud de adopción no encontrada');
    }

    if (requestToUpdate.status === status) {
        throw new Error('El estado ya está establecido en el valor proporcionado');
    }

    requestToUpdate.status = status;

    const updatedRequest = await requestToUpdate.save();

    if (!updatedRequest) {
        throw new Error('Error al actualizar la solicitud');
    }

    return updatedRequest;
};
