import mongoose from 'mongoose';
import Animal from '../models/animalModel';
import Refugee from '../models/refugeeModel';

export const getAnimalsService = async () => {
    const animals = await Animal.find();

    if (animals.length === 0) {
        throw new Error('No se encontraron animales registrados');
    }

    return animals;
};

export const getAnimalesByRefugeeService = async (refugeeId: string) => {
    const refugee = await Refugee.findById(refugeeId);

    if (!refugee) {
        throw new Error('No se encontró el refugio');
    }

    const animals = refugee?.pets

    if (animals) {
        if(animals.length === 0)
        throw new Error('Este refugio no posee animales registrados');
    }

    return animals;
};

export const getAnimalService = async (id: string) => {
    const animal = await Animal.findById(id);

    if (!animal) {
        throw new Error('No se encontró el animal');
    }

    return animal;
};

export const createAnimalService = async (animalData: {
    refugee_id: mongoose.Types.ObjectId;
    name: string;
    age: number;
    species: string;
    breed?: string;
    health_status: string;
    description: string;
    photos: string[];
    adoption_status: 'disponible' | 'en proceso' | 'adoptado';
}) => {
    const newAnimal = new Animal(animalData);
    const savedAnimal = await newAnimal.save();
    return savedAnimal;
};


export const updateAnimalService = async (id: string, updateData: any) => {
    const updatedAnimal = await Animal.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedAnimal) {
        throw new Error('Animal no encontrado');
    }

    return updatedAnimal;
};

export const deleteAnimalService = async (id: string) => {
    const deleteAnimal = await Animal.findByIdAndDelete(id);

    if (!deleteAnimal) {
        throw new Error('Animal no encontrado');
    }
};