import express, { Express } from "express";
import router from "./routes/indexRoutes";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import { authenticateToken, authenticateAdminToken } from "./middlewares/authMiddleware";
import { isPublicRoute } from "./constants/publicRoutes";

const isAdminRoute = (path: string) => {
  return path.startsWith('/admin'); // Detectar rutas de administrador
};

const app: Express = express();
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  if (isPublicRoute(req.path, req.method)) {
    return next();
  }

  if (isAdminRoute(req.path)) {
    if (req.path === '/admin/createAdmin') {
      return next();
    }
    return authenticateAdminToken(req, res, next);
  }

  authenticateToken(req, res, next);
});

app.use(router);

export { app };
