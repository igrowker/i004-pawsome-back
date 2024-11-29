import { Request, Response } from 'express';
import DonationRequest from '../models/donationsRequest';
import mongoose from 'mongoose';

export const createDonationRequest = async (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, monetaryDonation, cuantityDonation, donationNumber } = req.body;

    if (!req.user) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    const refugee_id = req.user.id;

    console.log("refugee_id:", refugee_id)

    if (!title || !description || !imageUrl || !refugee_id || typeof monetaryDonation !== 'boolean') {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const donationRequest = new DonationRequest({
      title,
      description,
      imageUrl,
      refugee_id: refugee_id,
      monetaryDonation,
      targetAmountMoney: monetaryDonation ? cuantityDonation : undefined,
      targetItemsCount: !monetaryDonation ? donationNumber : undefined, 
    });
    
    await donationRequest.save();

    res.status(201).json({ message: 'Donation request created successfully', donationRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating donation request', error });
  }
};


export const getAllDonationRequests = async (req: Request, res: Response) => {
  try {
    const donationRequests = await DonationRequest.find().populate('donationId');
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