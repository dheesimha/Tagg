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

const riderSchema = new mongoose.Schema({
  name: {
    type: String,

  },

  usn: {
    type: String,
  },

  aadharNo:
  {
    type: String,
  },

  dlNo:
  {
    type: String,
  },

  password: {
    type: String,

  },

  phoneNo:
  {
    type: String,
  },


});


riderSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});

riderSchema.plugin(findOrCreate);

const Rider = new mongoose.model("Rider", riderSchema);


passport.use(Rider.createStrategy())


const tagSchema = new mongoose.Schema({
  name: {
    type: String,

  },

  usn: {
    type: String,
  },

  aadharNo:
  {
    type: String,
  },

  dlNo:
  {
    type: String,
  },

  password: {
    type: String,

  },

  phoneNo:
  {
    type: String,
  },


});


tagSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});

tagSchema.plugin(findOrCreate);

const Tag = new mongoose.model("Tag", riderSchema);


passport.use(Tag.createStrategy())



passport.serializeUser(function (user, done) {
  done(null, user);
});



passport.deserializeUser(function (id, done) {
  Tag.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function (username, password, done) {
    Tag.findOne({ username: username }, function (err, user) {
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

app.route("/")
  .get((req, res) => {
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

  .post((req, res) => {
    const user = new Rider({
      username: req.body.username,
      password: req.body.password,
    })

    req.login(user, (err) => {
      if (err) {
        console.log(err)
      }

      else {

        passport.authenticate("local")(req, res, () => {
          res.redirect("/rider")
        })
      }
    })
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

  .post((req, res) => {

    const username = req.body.name
    const password = req.body.password

    Rider.register({ username: username, provider: "local" }, password, (err, user) => {
      if (err) {
        console.log(err)
        res.redirect("/register")
      }

      else {
        passport.authenticate("local")(req, res, () => {

          let rider = new Rider({
            phoneNo: req.body.phoneNo,
            aadharNo: req.body.aadharNo,
            dlNo: req.body.dlNo,
            usn: req.body.usn

          })

          rider.save((err, results) => {
            console.log("Record added")

          })

          res.redirect("/rider-login")


        })
      }
    })
  })

app.route("/register-tag")
  .get((req, res) => {
    res.render("register-tag")
  })

  .post((req, res) => {

    const username = req.body.name
    const password = req.body.password

    Tag.register({ username: username, provider: "local" }, password, (err, user) => {
      if (err) {
        console.log(err)
        res.redirect("/register")
      }

      else {
        passport.authenticate("local")(req, res, () => {

          let tag = new Tag({
            phoneNo: req.body.phoneNo,
            aadharNo: req.body.aadharNo,
            dlNo: req.body.dlNo,
            usn: req.body.usn

          })

          tag.save((err, results) => {
            console.log("Record added")

          })

          res.redirect("/tag-login")


        })
      }
    })
  })


app.route("/tag")
  .get((req, res) => {
    res.render("tag")
  })

  app.route("/status")
  .get((req, res) => {
    res.render("status")
  })

app.listen(port, () => {
  console.log(`Application running on port ${port}.`);
});
