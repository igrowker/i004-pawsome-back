import dotenv from "dotenv";
import { app } from "./src/app";
import { dbConfig } from "./src/config/dbConfig";

dotenv.config();

const PORT = process.env.PORT || 3000;

dbConfig()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server]: Server iniciado en http://localhost:${PORT}`);
    });
  });
