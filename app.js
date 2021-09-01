const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const ejs = require("ejs");
const port = 3000;
const path = require('path');

// app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

// app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Application running on port ${port}.`);
  });

// Set up home route

app.route("/").get((req, res) => {
    res.render('home');
  })