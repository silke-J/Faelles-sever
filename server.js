import express from "express";
import cors from "cors";
import staysRoutes from "./routes/stay.route.js";
import activitiesRouter from "./routes/activity.route.js";
import reviewRouter from "./routes/review.route.js";
import userRouter from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

// Server
const expressServer = express();

// Tillader requests fra forskellige porte
expressServer.use(cors());

expressServer.use(express.json());

// Routes
expressServer.use(staysRoutes);
expressServer.use(activitiesRouter);
expressServer.use(reviewRouter);
expressServer.use(userRouter);
expressServer.use(authRoute);

expressServer.listen(3000, () => {
  console.log("Serveren kører på http://localhost:3000");
});
