import Animal, { IAnimal } from '../models/animalModel';
import Refugee from '../models/refugeeModel';

export const getAnimalsService = async () => {
    const animals = await Animal.find();

    if (animals.length === 0) {
        throw new Error('No se encontraron animales registrados');
    }

    return animals;
};

export const getAnimalesByRefugeeService = async (refugeeId: string) => {
    const refugee = await Refugee.findById(refugeeId).populate({
        path: 'pets',
        model: 'Animal',
        select: '-__v'
    });

    if (!refugee) {
        throw new Error('No se encontró el refugio');
    }

    if (!refugee.pets || refugee.pets.length === 0) {
        throw new Error('Este refugio no posee animales registrados');
    }

    return refugee.pets;
}

export const getAnimalService = async (id: string) => {
    const animal = await Animal.findById(id);

    if (!animal) {
        throw new Error('No se encontró el animal');
    }

    return animal;
};

export const getAvailableAnimalService = async () => {
    const animals = await Animal.find({ adoption_status: 'disponible' });

    if (!animals || animals.length === 0) {
        throw new Error('No se encontraron animales disponibles');
    }

    return animals;
};


export const createAnimalService = async (animalData: IAnimal) => {
    const newAnimal = new Animal(animalData);
    const savedAnimal = await newAnimal.save();

    const refugee = await Refugee.findById(animalData.refugee_id);

    if (!refugee) {
        throw new Error('Refugio no encontrado');
    }

    refugee.pets.push(savedAnimal.id);
    await refugee.save();
    
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