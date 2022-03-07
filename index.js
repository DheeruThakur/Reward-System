const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const rewardRoutes = require("./routes/reward");
var session = require("express-session");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/user", userRoutes);
app.use("/reward", rewardRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("server connected successfully");

  app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
  });
});
