import express from "express";
import "express-async-errors"
import { DbConnect } from "./db/DdConnect";
import { config } from "./config/config";
import { errorHandler } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";

import router from "./routes/route";
const app = express();


const port =  config.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", router);

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
