import express from "express"
import type {Request, Response, NextFunction} from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import indexRoutes from "./routes/index"
import authRoutes from "./routes/auth.routes";

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use("/", indexRoutes)
app.use("/auth", authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

export default app