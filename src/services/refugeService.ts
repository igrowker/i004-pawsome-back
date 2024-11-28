import { Types } from "mongoose";
import { putRefugeNeedsDto } from "../dtos/putRefugeNeeds.dto";
import Refugee, { RefugeeInput } from "../models/refugeeModel";
import RefugeeNeed from "../models/refugeeNeedModel";


export const getRefugesService = async (): Promise<any[]> => {
    const refugees = await Refugee.find();

    if (!refugees || refugees.length === 0) {
        throw new Error(`Error loading refugees`);
    }

    return refugees;
}

export const createRefugeeService = async (refugeeData: RefugeeInput) => {
    const { user_id, name_refugee, description, img } = refugeeData;

    try {
        const newRefugee = new Refugee({
            user_id: new Types.ObjectId(user_id),
            name_refugee,
            description,
            img: img,
        });

        const savedRefugee = await newRefugee.save();

        return savedRefugee;
    } catch (error) {
        console.error('Error al crear el refugio:', error);
        throw new Error('No se pudo crear el refugio');
    }
};

export const putRefugeNeedsService = async (id: any, data: putRefugeNeedsDto): Promise<any> => {
    const refuge = await Refugee.findById(id);

    if (!refuge) {
        throw new Error(`Refuge with ID ${id} not found.`);
    };

    const newRefuge = await RefugeeNeed.updateOne({ refugee_id: id }, { ...data });
    
    return newRefuge;
}