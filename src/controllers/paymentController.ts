import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
export const createSession = async (req: Request, res: Response) => {
  const { title, description, moneyAmount, refugee_id, user_id } = req.body;
  const stripe = new Stripe(process.env.STRIPE!);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: title,
              description: description,
            },
            unit_amount: moneyAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/donation-success",
      cancel_url: "http://localhost:5173/donation-cancel",
      metadata: {
        refugee_id: refugee_id,
        user_id: req.user?.id || "unknown_user",
      },
    });

    // Devolver la sesión creada
    res.status(201).json({ message: "Session created successfully", session });
  } catch (error) {
    console.error("Error creando la sesión:", error);
    res.status(500).json({ message: "Error creating session", error });
  }
};
