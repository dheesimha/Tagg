require("dotenv").config();
const port = 3000
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const passportLocalMongoose = require("passport-local-mongoose")
const _ = require("lodash");
const LocalStrategy = require('passport-local').Strategy;
const findOrCreate = require("mongoose-findorcreate");


const app = express()

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())

app.use(passport.session())


const uri = `mongodb+srv://${process.env.MONGODB_ADMIN}:${process.env.MONGODB_PASSWORD}@cluster0.h1d0c.mongodb.net/taggDB?retryWrites=true&w=majority`


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

  .then(() => {
    console.log("Connected to the cloud");
  })

  .catch((err) => {
    console.log(err);
  })


// mongoose.set("useCreateIndex", true); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,

  },

  password: {
    type: String,

  },



});


userSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});

userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);


passport.use(User.createStrategy())


passport.serializeUser(function (user, done) {
  done(null, user);
});



passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));




// Set up home route

app.route("/").get((req, res) => {
  res.render('home');
})

app.route("/register")
  .get((req, res) => {
    res.render("register-prompt")
  })


app.route("/login")
  .get((req, res) => {
    res.render("login-prompt")
  })


app.route("/rider-login")
  .get((req, res) => {
    res.render("login-rider")
  })


app.route("/tag-login")
  .get((req, res) => {
    res.render("login-tag")
  })

app.route("/rider")

  .get((req, res) => {
    res.render("rider")
  })

app.route("/register-rider")
  .get((req, res) => {
    res.render("register-rider")
  })

app.route("/register-tag")
  .get((req, res) => {
    res.render("register-tag")
  })


app.route("/tag")
  .get((req, res) => {
    res.render("tag")
  })


app.listen(port, () => {
  console.log(`Application running on port ${port}.`);
});
