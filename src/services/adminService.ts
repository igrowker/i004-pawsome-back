
import Usuario from '../models/userModel';
import ActivityLog from '../models/adminModel';
import AnimalModel from '../models/animalModel';
import AdoptionModel from '../models/adoptionRequests';
import Refugee from '../models/refugeeModel';
import DonationRequest from '../models/donationsRequest';
import VolunteerOpportunity from '../models/volunteersModel';
import AdoptionRequests from '../models/adoptionRequests';
import Animal from '../models/animalModel';

export const getDashboardData = async () => {
  try {
    const [totalUsers, totalOpportunities, totalActivities] = await Promise.all([
      Usuario.countDocuments(),
      VolunteerOpportunity.countDocuments(),
      ActivityLog.countDocuments(),
    ]);

    const recentActivities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const totalAnimals = await AnimalModel.countDocuments();
    const totalAdoptions = await AdoptionModel.countDocuments();

    const totalRefugees = await Refugee.countDocuments();
    const totalDonationsActive = await DonationRequest.countDocuments({ status: 'active' });
    const totalDonationsCompleted = await DonationRequest.countDocuments({ status: 'completed' });
    const totalVolunteerOpportunities = await VolunteerOpportunity.countDocuments();
    const totalLogs = await ActivityLog.countDocuments();

    const metrics = await getMetrics();

    return {
      totalUsers,
      totalOpportunities,
      totalActivities,
      recentActivities,
      totalAnimals,
      totalAdoptions,
      totalRefugees,
      donations: {
        active: totalDonationsActive,
        completed: totalDonationsCompleted,
      },
      volunteerOpportunities: totalVolunteerOpportunities,
      activityLogs: totalLogs,
      users: metrics.users,
      adoptions: metrics.adoptions,
      animals: metrics.animals,
      refugees: metrics.refugees,
      donationsMetrics: metrics.donations,
      volunteerOpportunitiesMetrics: metrics.volunteerOpportunities,
      activityLogsMetrics: metrics.activityLogs,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
    ? `Error al obtener los datos del dashboard: ${error.message}`
    : 'Error desconocido al obtener los datos del dashboard';

    throw new Error(errorMessage);
  }
};

export const getMetrics = async () => {
  try {
    const totalUsers = await Usuario.countDocuments() || 0;
    const activeUsers = await Usuario.countDocuments({ isActive: true }) || 0;
    const volunteers = await Usuario.countDocuments({ isVolunteer: true }) || 0;

    const adoptionRequests = await AdoptionRequests.countDocuments() || 0;
    const pendingAdoptions = await AdoptionRequests.countDocuments({ status: 'en revisión' }) || 0;
    const acceptedAdoptions = await AdoptionRequests.countDocuments({ status: 'en aceptada' }) || 0;

    const totalAnimals = await Animal.countDocuments() || 0;
    const availableAnimals = await Animal.countDocuments({ adoption_status: 'disponible' }) || 0;

    const totalRefugees = await Refugee.countDocuments() || 0;

    const activeDonations = await DonationRequest.countDocuments({ status: 'active' }) || 0;
    const completedDonations = await DonationRequest.countDocuments({ status: 'completed' }) || 0;

    const totalVolunteerOpportunities = await VolunteerOpportunity.countDocuments() || 0;

    const totalLogs = await ActivityLog.countDocuments() || 0;

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        volunteers,
      },
      adoptions: {
        total: adoptionRequests,
        pending: pendingAdoptions,
        accepted: acceptedAdoptions,
      },
      animals: {
        total: totalAnimals,
        available: availableAnimals,
      },
      refugees: totalRefugees,
      donations: {
        active: activeDonations,
        completed: completedDonations,
      },
      volunteerOpportunities: totalVolunteerOpportunities,
      activityLogs: totalLogs,
    };
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? `Error obteniendo métricas: ${error.message}`
        : "Error desconocido al obtener métricas"
    );
    
    
  }
};

export const CreateAdmin = async (userID: string) => {
  const user = await Usuario.findById({ where: { id: userID } })

  if (!user) {
    throw new Error('No se encontró el usuario');
  }
  if (user.role === 'user') {
    user.role = 'admin';
    await user.save();
  } else {
    throw new Error('El usuario ya tiene un rol diferente a "user"');
  }
};