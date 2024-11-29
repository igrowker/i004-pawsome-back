import { Request, Response, NextFunction } from "express";
import { uploadFileToCloudinary } from "../services/fileUploadService";
import { validateFile } from "../validations/fileValidator";
import { BadRequest } from "http-errors";

export const uploadFile = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No se ha proporcionado ningún archivo.",
      });
    }

    validateFile(file);

    const result = await uploadFileToCloudinary(file);

    res.status(200).json({
      message: "Archivo subido exitosamente.",
      url: result.secure_url,
    });
  } catch (error) {
    if (error instanceof BadRequest) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
