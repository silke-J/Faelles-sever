/* læser miljøvariabler ind fra .env.local så process.env.CLIENT_URL og andre variabler ikke bliver undefined */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import dbConnect from "./util/dbconnect.js";

import quizRoute from "./routes/quiz.routes.js";
// MongoDB
dbConnect();

// Server
const expressServer = express();

// Tillader requests fra forskellige porte
expressServer.use(cors());

/* For at kunne læse req.body i JSON */
expressServer.use(express.json());

// Routes
expressServer.use(quizRoute);

//Starter serveren
expressServer.listen(3000, () => {
  console.log("Serveren kører på http://localhost:3000");
});
