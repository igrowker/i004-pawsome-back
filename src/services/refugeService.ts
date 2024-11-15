import { putRefugeNeedsDto } from "../dtos/putRefugeNeeds.dto";
import RefugeeNeed from "../models/refugeeNeedModel";
import Usuario from "../models/userModel"


export const getRefugesService = async (): Promise<any[]> => {
    const refugees = await Usuario.find({type: 'refuge'});

    if (!refugees) {
        throw new Error(`error loading refugees`);
    };

    return refugees;
}

export const putRefugeNeedsService = async (id: any, data: putRefugeNeedsDto): Promise<any> => {
    const refuge = await Usuario.findById(id);

    if (!refuge) {
        throw new Error(`Refuge with ID ${id} not found.`);
    };

    const newRefuge = await RefugeeNeed.updateOne(id,{...data});
    
    return newRefuge;
}