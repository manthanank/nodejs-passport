const passport = require("passport");
const User = require("../models/User");

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error registering user", error: err });
  }
};
