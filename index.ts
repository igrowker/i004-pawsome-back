import dotenv from "dotenv";
import { app } from "./src/app";
import { dbConfig } from "./src/config/dbConfig";

dotenv.config();

const PORT = process.env.PORT || 3000;

const URI = process.env.URI || '';

if (URI) {
  dbConfig()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`[server]: Server iniciado en http://localhost:${PORT}`);
      });
    })
    .catch((err: Error) => {
      console.error("Conexion fallida con la DB:", err.message);
    });
} else {
  console.warn("La URI de la DB no esta configurada. Iniciando server sin conexion con DB.");
  app.listen(PORT, () => {
    console.log(`[server]: Server iniciado en: http://localhost:${PORT}`);
  });
}