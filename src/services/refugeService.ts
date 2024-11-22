import { putRefugeNeedsDto } from "../dtos/putRefugeNeeds.dto";
import RefugeeNeed from "../models/refugeeNeedModel";
import Usuario from "../models/userModel"


export const getRefugesService = async (): Promise<any[]> => {
    const refugees = await Usuario.find({ role: 'refugee' });

    if (!refugees || refugees.length === 0) {
        throw new Error(`Error loading refugees`);
    }

    return refugees;
}


export const putRefugeNeedsService = async (id: any, data: putRefugeNeedsDto): Promise<any> => {
    const refuge = await Usuario.findById(id);

    if (!refuge) {
        throw new Error(`Refuge with ID ${id} not found.`);
    };

    const newRefuge = await RefugeeNeed.updateOne({ refugee_id: id }, { ...data });
    
    return newRefuge;
}