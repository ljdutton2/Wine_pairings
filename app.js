//set up for express
const express = require("express");
const app = express();

//set up for handlebars frontend
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//set up for styles
app.use(express.static("public"));

const fetch = require("node-fetch"); //to fetch data from spoonacular API
require("dotenv").config(); //to hide secret variables from github

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
      const products = data.productMatches;
      res.render("home", { wine });
      console.log(wine, products);
    });
});

app.listen(3000, () => {
  console.log(` Find your wine pairing at: http://localhost:3000/`);
});
