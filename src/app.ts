import express, { Express } from "express";
import router from "./routes/indexRoutes";
import cors from "cors";
import morgan from "morgan";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

export { app };
