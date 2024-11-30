import { Request, Response } from 'express';
import DonationRequest from '../models/donationsRequest';

export const createDonationRequest = async (req: Request, res: Response) => {
  try {
    const { id, title, description, targetAmount, refugee_id, endDate, material } = req.body;

    const donationRequest = new DonationRequest({
      id,
      title,
      description,
      targetAmount,
      refugee: refugee_id,
      endDate,
      material
    });

    await donationRequest.save();
    res.status(201).json({ message: 'Created successfully', donationRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error in the request', error });
  }
};

export const getAllDonationRequests = async (req: Request, res: Response) => {
  try {
    const donationRequests = await DonationRequest.find().populate('refugee_id');
    res.status(200).json({ donationRequests });
  } catch (error) {
    res.status(500).json({ message: 'Error in the request', error });
  }
};

export const deleteDonationRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedRequest = await DonationRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Deleted successfully', deletedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error in the request', error });
  }
};

export const updateDonationRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['active', 'completed', 'canceled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedRequest = await DonationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', updatedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};