const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

connectDB();

const hospitals = require("./routers/hospitals");
const auth = require("./routers/auth");
const appointments = require("./routers/appointments");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointments);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Error:", err.message);
  server.close(() => process.exit(1));
});
