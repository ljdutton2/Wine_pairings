//express
const express = require("express");
const app = express();
//url including input food item and my api key
const url = "https://api.spoonacular.com/:food/wine/pairing?apiKey=API_KEY";
//this should go in .env at some point but we not super worried about that now
//const API_KEY = "0f84c57f2e6b4079ad0510b7e5deefad";
//variables and set up for handlebars frontend
const { engine } = require("express-handlebars");
//to fetch data from spoonacular
const fetch = require("node-fetch");
//to hide secret variables from github
require("dotenv").config();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  let food = "";
  if (req.query.food) {
    food = req.query.food;
  }
  fetch(
    `https://api.spoonacular.com/food/wine/pairing?food=${food}&apiKey=0f84c57f2e6b4079ad0510b7e5deefad`
  )
    .then((response) => response.json())
    .then((data) => {
      const wine = data.pairingText;
      res.render("home", { wine });
      console.log(wine);
    });
});

app.listen(3000, () => {
  console.log(` Find your wine pairing at: http://localhost:3000/`);
});
