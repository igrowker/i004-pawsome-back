import express, { Express } from "express";
import router from "./routes/indexRoutes";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';

const app: Express = express();
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);


export { app };
