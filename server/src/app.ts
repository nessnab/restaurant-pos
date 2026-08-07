import express from "express"
import type {Request, Response, NextFunction} from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import indexRoutes from "./routes/index"
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes"
import menuRoutes from "./routes/menu.routes"
import orderRoutes from "./routes/order.routes"
import restaurantRoutes from "./routes/restaurant.routes"
import { errorHandler } from "./middleware/errorHandler"

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
app.use("/", 
  indexRoutes, 
  userRoutes,
  categoryRoutes,
  menuRoutes,
  orderRoutes,
  restaurantRoutes
);

app.use("/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app