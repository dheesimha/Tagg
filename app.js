const port = 3000
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const passportLocalMongoose = require("passport-local-mongoose")
const LocalStrategy = require('passport-local').Strategy;
const findOrCreate = require("mongoose-findorcreate");


const app = express()

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
  console.log(`Application running on port ${port}.`);
});

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

