import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

const URI = process.env.URI || '';

const dbConfig = async (): Promise<void> => {
  try {
    if (!URI) {
      throw new Error("URI no definida en .env");
    }

    await connect(URI);
    console.log("Conexion con la DB exitosa!");
  } catch (err) {
    console.error("Conexion con la DB fallida:", (err as Error).message);
    process.exit(1);
  }
};

export { dbConfig };
