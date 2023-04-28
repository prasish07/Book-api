import express from "express";
import "express-async-errors"
import { DbConnect } from "./db/DdConnect";
import { config } from "./config/config";
import { errorHandler } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

dotenv.config({path:"../.env"});

import router from "./routes/route";
import UserRouter from "./routes/userRoute"
const app = express();

// port
const port =  config.server.port;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(config.jwt.secret));

// routes
app.use("/api/v1/book", router);
app.use("/api/v1/auth",UserRouter);

// not found
app.use(notFound);

// error handler
app.use(errorHandler)

// listening to port
const start = async () => {
  try {
    // Connecting to Database
    await DbConnect(config.mongo.url)
  } catch (error) {
    console.log(error);
    
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
start();
