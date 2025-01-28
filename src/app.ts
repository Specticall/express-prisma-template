import express from "express";
import cors from "cors";
import router from "./routes";
import ErrorController from "./controllers/ErrorController";
const app = express();

/**
 * Enable CORS access
 */
app.use(cors());

/**
 * Middleware to parse the request body
 */
app.use(express.json());

/**
 * Routes
 */
app.use(router);

/**
 * Error Handling
 */
app.use(ErrorController);

export default app;
