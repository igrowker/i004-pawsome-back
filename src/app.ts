import express, { Express } from "express";
import router from "./routes/indexRoutes";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import { authenticateToken } from "./middlewares/authMiddleware";

const app: Express = express();
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
    if (req.path === '/auth/login' || req.path === '/auth/register') { 
      return next();
    }
    authenticateToken(req, res, next);
  });

app.use(router);

export { app };
