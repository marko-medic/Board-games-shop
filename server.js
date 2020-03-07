const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
require("colors");
const connectDB = require("./config/db");
const games = require("./routes/games");
const users = require("./routes/users");
const orders = require("./routes/orders");
const { PORT_FALLBACK } = require("./shared/constants");

dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/games", games);
app.use("/api/v1/users", users);
app.use("/api/v1/orders", orders);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || PORT_FALLBACK;

process.on("uncaughtException", function(err) {
  // handle the error safely
  console.log(`uncaughtException ${err}`.yellow);
});

app.listen(
  PORT,
  console.log(
    `Server running at port ${PORT} in ${process.env.NODE_ENV} mode!`.yellow
      .bold
  )
);
