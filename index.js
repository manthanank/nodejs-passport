const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
require("./config/passport"); // Load passport configurations

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log(
        `Server started on http://localhost:${3000 || process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
