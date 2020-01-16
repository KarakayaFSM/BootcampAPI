const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require('colors');

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to MongoDB
connectDB();

//Routes
const bootcamps = require("./routes/bootcamps");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} mode: ${process.env.NODE_ENV}`.yellow);
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`MongoDB Error: ${err.message}`.red);
  //Close server & terminate process
  server.close(() => process.exit(1));
});
