//require necessary non-constant libraries
require("dotenv").config();
require("express-async-errors");

//constant libraries
const express = require("express");
const app = express();
const cors = require("cors");

//Routers
const userRouter = require("./routes/userRouter");
const deviceRouter = require("./routes/deviceRouter");

//middlewareHandlers
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const connectDb = require("./db/connect");

//Authenticate Middlewares
const authenticateUser = require("./middlewares/authenticateUser");
const authenticateAdmin = require("./middlewares/authenticateAdmin");

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/device", deviceRouter);

//Error Handlers
app.use(notFound);
app.use(errorHandlerMiddleware);

//db connection
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_LOCAL);
    app.listen(port, console.log("connecting to port UserData"));
  } catch (error) {
    console.log(error);
  }
};

start();
