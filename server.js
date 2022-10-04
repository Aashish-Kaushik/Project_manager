const express = require("express");
const app = express();
const connectDB = require("./config/db");
const projectModel = require("./models/projects");
const userModel = require("./models/user");
const {
  initializingPassport,
  isAuthenticated,
} = require("./controllers/passport");
const passport = require("passport");
const expressSession = require("express-session");

connectDB();
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);
app.set("view engine", "ejs");
initializingPassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.render("login");
});
app.get("/home", isAuthenticated, async (req, res) => {
  res.render("home");
});
app.post("/createProject", isAuthenticated, async (req, res) => {
  try {
    const project = await projectModel.create({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      "timeLine.startTime": req.body.startTime,
      "timeLine.endTime": req.body.endTime,
    });
    res.send(project);
  } catch (err) {
    res.json({ error: err.message });
  }
});
app.post("/register", async (req, res) => {
  try {
    const userExist = await userModel.findOne({ username: req.body.username });
    if (userExist) {
      res.json({ message: "user already exist please login " });
    } else {
      const user = await userModel.create({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        userType: req.body.userType,
      });
      res.send(user);
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});
app.post(
  "/login",
  passport.authenticate("local", {
    // successReturnToOrRedirect: "/home",
    failureRedirect: "/register",
    failureFlash: true,
    // successRedirect: "/home",
  }),
  async (req, res) => {
    try {
      res.render("project");
      // res.json({ message: "login successfully" });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
);
app.get("/projects", isAuthenticated, async (req, res) => {
  try {
    const user = await userModel.find({ username: req.body.username });
    if (user.role === "admin") {
      const ProjectsList = await projectModel.find();
      const UserList = await userModel.find({ role: "user" });
      res.json(UserList, ProjectsList);
    } else if (user.role === "user") {
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});
app.post("/requestproject", async (req, res) => {
  try {
    const requestProject = await userModel.findOneAndUpdate({
      role: "admin",
      username: req.body.creater,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});
app.post("/approvel", async (req, res) => {
  try {
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/logout", async (req, res) => {
  req.logout();
  res.redirect("/login");
});
app.listen(3000, () => {
  console.log("server runing at port 3000");
});
