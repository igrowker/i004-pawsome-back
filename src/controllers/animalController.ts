import { Request, Response } from 'express';
import { getAnimalService, getAnimalsService, updateAnimalService, createAnimalService, deleteAnimalService, getAnimalesByRefugeeService } from '../services/animalService';

export const getAnimals = async (req: Request, res: Response): Promise<Response> => {
    try {
        const animals = await getAnimalsService();
        return res.status(200).json(animals);

    } catch (error) {
        if ((error as Error).message === 'No se encontraron animales registrados') {
            return res.status(404).json({ message: (error as Error).message });
        }
        return res.status(500).json({ message: 'Error al obtener animales', error: (error as Error).message });
    }
};

export const getAnimalesByRefugee = async (req: Request, res: Response): Promise<Response> => {
    const { refugeeId } = req.params;

    try {
        const animals = await getAnimalesByRefugeeService(refugeeId);
        return res.status(200).json(animals);

    } catch (error) {
        if ((error as Error).message === 'No se encontró el refugio' || (error as Error).message === 'Este refugio no posee animales registrados') {
            return res.status(404).json({ message: (error as Error).message });
        }
        return res.status(500).json({ message: 'Error al obtener animales del refugio', error: (error as Error).message });
    }
};

export const getAnimal = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const animal = await getAnimalService(id);

        return res.status(200).json(animal);

    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'No se encontró el animal') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error al obtener el animal', error: error.message });
        }
        return res.status(500).json({ message: 'Error desconocido', error });
    }
};

export const createAnimal = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { refugee_id, name, age, species, breed, health_status, description, photos, adoption_status } = req.body;
        const newAnimal = await createAnimalService({ refugee_id, name, age, species, breed, health_status, description, photos, adoption_status });
        return res.status(201).json({ message: 'Animal creado con éxito', animal: newAnimal });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el animal', error: (error as Error).message });
    }
};

export const updateAnimal = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedAnimal = await updateAnimalService(id, updateData);

        return res.status(200).json(updatedAnimal);

    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'Animal no encontrado') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error al actualizar el animal', error: error.message });
        }

        return res.status(500).json({ message: 'Error desconocido', error });
    }
};

export const deleteAnimal = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        await deleteAnimalService(id);

        return res.status(200).json({ message: "Animal eliminado exitosamente" });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'Animal no encontrado') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error al eliminar el animal', error: error.message });
        }

        return res.status(500).json({ message: 'Error desconocido', error });
    }
};
