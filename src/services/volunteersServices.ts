import VolunteersModel from '../models/volunteersModel';

export const getVolunteerOpportunities = async () => {
  return VolunteersModel.find().populate('refugee_id', 'name');
};
export const getOpportunitiesByRefugeeId = async (refugee_id: string) => {
  return VolunteersModel.find({ refugee_id }).populate('refugee_id', 'name');
};


export const createVolunteerOpportunity = async ({
  refugee_id,
  user_id,
  description,
  requirements,
  availability,
}: {
  refugee_id: string;
  user_id: string;
  description: string;
  requirements: string;
  availability: string;
}) => {
  if (![refugee_id, description, requirements, availability].every(Boolean)) {
    throw new Error("Por favor, completa todos los campos requeridos");
  }

  const opportunity = new VolunteersModel({
    refugee_id,
    user_id,
    description,
    requirements,
    availability,
  });

  return opportunity.save();
};

export const deleteVolunteerOpportunity = async (refugee_id: string) => {
  const result = await VolunteersModel.deleteMany({ refugee_id });
  if (result.deletedCount === 0) {
    throw new Error("No se encontró ninguna oportunidad de voluntariado para el refugio especificado");
  }
  return result;
};
