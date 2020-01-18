const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');
const async = require('./middleware/async')

//load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();

const bootcamps = require("./routes/bootcamps");

const app = express();

//body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);

//must be below app.use to use in bootcamps controller
app.use(errorHandler);  

app.use(async);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} mode: ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`MongoDB Error: ${err.stack}`);
  //Close server & terminate process
  server.close(() => process.exit(1));
});
