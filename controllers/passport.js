const User = require("../models/user");
const LocalStrategy = require("passport-local");

exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username }).lean();

        if (!user) return done("test error 1", null);
        if (user.password !== password) return done("test error 2", null);
        return done(false, user);
      } catch (err) {
        return done(err, null);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, { id: user._id });
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = User.findById(id);
    } catch (err) {
      done(err, false);
    }
  });
};

exports.isAuthenticated = async (req, res, next) => {
  if (req.user) return next();
  res.redirect("/home");
};
