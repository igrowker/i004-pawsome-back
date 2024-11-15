import AdoptionRequests from "../models/adoptionRequests"

export const CreateAdoptionRequest = async (adop: any) => {
    const newAdoption = await AdoptionRequests.create(adop);

    if (!newAdoption) {
        throw new Error("La solicitud no se completo correctamente") 
    }

    return newAdoption;
}
