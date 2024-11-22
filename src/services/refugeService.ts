import { putRefugeNeedsDto } from "../dtos/putRefugeNeeds.dto";
import Refugee from "../models/refugeeModel";
import RefugeeNeed from "../models/refugeeNeedModel";


export const getRefugesService = async (): Promise<any[]> => {
    const refugees = await Refugee.find();

    if (!refugees || refugees.length === 0) {
        throw new Error(`Error loading refugees`);
    }

    return refugees;
}


export const putRefugeNeedsService = async (id: any, data: putRefugeNeedsDto): Promise<any> => {
    const refuge = await Refugee.findById(id);

    if (!refuge) {
        throw new Error(`Refuge with ID ${id} not found.`);
    };

    const newRefuge = await RefugeeNeed.updateOne({ refugee_id: id }, { ...data });
    
    return newRefuge;
}