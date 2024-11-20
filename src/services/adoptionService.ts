import { postAdoptionDto } from "../dtos/postAdoption.dto";
import AdoptionRequests from "../models/adoptionRequests"

export const CreateAdoptionRequest = async (adop: postAdoptionDto) => {
    const newAdoption = await AdoptionRequests.create(adop);

    if (!newAdoption) {
        throw new Error("La solicitud no se completo correctamente") 
    }

    return newAdoption;
}
