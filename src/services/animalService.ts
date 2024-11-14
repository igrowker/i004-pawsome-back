import mongoose from 'mongoose';
import Animal from '../models/animalModel';

export const getAnimalsService = async () => {
    const animals = await Animal.find();

    if (animals.length === 0) {
        throw new Error('No se encontraron animales registrados');
    }

    return animals;
};

export const getAnimalService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID de animal no válido');
    }

    const animal = await Animal.findById(id);

    if (!animal) {
        throw new Error('No se encontró el animal');
    }

    return animal;
};

export const updateAnimalService = async (id: string, updateData: any) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID de animal no válido');
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedAnimal) {
        throw new Error('Animal no encontrado');
    }

    return updatedAnimal;
};