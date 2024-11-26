import { Request, Response } from "express";
import { putRefugeNeedsDto } from "../dtos/putRefugeNeeds.dto";
import { createRefugeeService, getRefugesService, putRefugeNeedsService } from "../services/refugeService";

export const getRefugees = async (req: Request, res: Response) => {
    try {
        const refugees = await getRefugesService();
        console.log(refugees);
        
        res.status(202).json({ message: 'loading Successful', refugees });
    } catch (error) {
        res.status(500).json({ message: 'loading error', error });
    }

}

export const createRefugee = async (req: Request, res: Response): Promise<void> => {
    const refugeeData = req.body;

    try {
        const refugee = await createRefugeeService(refugeeData);

        res.status(201).json({
            message: 'Refugio registrado correctamente',
            refugee
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar el refugio',
            error: (error as Error).message
        });
    }
};

export const putRefugeNeeds = async (req: Request, res: Response): Promise<void> => {
    const putRefuge: putRefugeNeedsDto = req.body;
    const { id } = req.params;

    try {
        const putrefugee = await putRefugeNeedsService(id, { ...putRefuge });
        res.status(202).json({ message: 'Successful update', putrefugee });
    } catch (error) {
        res.status(500).json({ message: 'Update error', error });
    }

}