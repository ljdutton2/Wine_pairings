# Wine Not? Wine Pairing App

## What is Wine Not?

Wine not? is a node.js application that allows the user to enter the name of an ingredient, meal or cuisine resulting in a proper wine pairing, explanation and reccomendation. Use Wine Not to always know which wine to drink with your meal!
Wine Not is perfect for when out at restaurants, impressing guests at house parties, or just thoroughly enjoying a glass of well paired wine with your dinner. 

## Requirements

* Node.js
* Express & Handlebars
* Homebrew
* Git
* Spoonacular API found here: https://spoonacular.com/food-api/docs#Wine-Pairing


 ## Installation
go to your terminal and run the following commands

  Step 1. Install node
```bash title="Install NodeJS"
brew install node
```

 Step 2. Clone the repo and install the dependencies.

```bash
git clone https://github.com/ljdutton2/Wine_pairings.git
cd Wine_pairings
```

```bash
npm install
```

Step 3. To start the express server, run the following

```bash
node app.js
```

Step 4. Open [http://localhost:3000](http://localhost:3000) and get started.







## Wanna build your own? Dev Tutorial Below! &darr; 

* Head over to the [Spoonacular](https://spoonacular.com/food-api/console#Dashboard) website and begin by making an account. Once you have an account click "My Console", then "Profile" from the left hand side options, "Generate API Key" and then finally "Show API key. Store this somewhere you can easily access it later!

* Create a new directory for your wine pairing app and navigate to it
```
mkdir wine_pairing_app
cd winepairing app
```
* Install dependencies & packages we will be using 
```bash title="Install NodeJS"
brew install node
npm install express
npm install nodemon -g
npm install express-handlebars
npm install dotenv
npm install node-fetch
```
* Initalize Project
```bash title="Initialize"
npm init -y
```
* Create main app file 
(this is where all of the instructions for our app will live)
```bash title="create app.js"
touch app.js
```
* Create other files we'll use to keep our secret info top secret
```
touch .ignore
touch .env
```
* Create the files we'll use to bring it all together & visualize the  output
```
mkdir views
mkdir views/layouts
touch views/home.handlebars
touch layouts/main.handlebars
```
* Initialize express by declaring constants
add the following lines of code to the top of your app.js 
```
const express = require("express");
const app = express();
```
* Initalize Handlebars so we can actually *see the output of our data
add the following lines of code below the express set up.
```
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
```
* Edit the HTML 
add this basic setup to main.handlebars
```
<!DOCTYPE html>
<html lang="en">
  
  <head>
    <link rel="stylesheet" href="styles.css" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wine not?</title>
  </head>
  <body>
    {{{body}}}
  </body>
</html>

```
*now we need to get the input from the user
so we know what food is chosen to pick the right wine!
add these lines of code to your home.handlebars file
```
<!DOCTYPE html>
<html lang="en">
  <head>
      <h1><center>WINE NOT?</center></h1>
      <h2><center>Generate a recommended wine pairing by meal:</center></h2>
    <form action="/" method="GET"><center>
        <input type="text" name="food" autocomplete="on">
        <button type="submit">Search</button></center>
    </form>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wine not?</title>
  </head>
  <body>
      {{wine}}
  </body>
 
</html>

```

If we take a look at the above, there are 2 things to note in the home.handlebars
    1. the blocked out {{wine}} in the body - think of this as a placeholder for the data we will be pulling from the API
    2. we added the form here, we are getting the food choice of the user and keeping it accessible in our home page by having action set to "/"

    ```
*Lets go ahead and get our app connected to spoonacular. Remember that API from earlier? Grab it and paste it in your .env like this:
'''
API_KEY=<your_api_key_here>
'''
*And then we fully hide this key away from github by adding the entire .env file into your .ignore. Yep! That easy just write '.env' in .gitignore, and you're all set!

*Great now lets go over to our app.js and set up the back end functionality to actually utilize this food item, and return the wine pairing reccomendation. 
First lets make sure our app.js can access the api key now that its hidden away, add this below your other variable declaration
```
require("dotenv").config();
```
below that were going to add the node-fetch package. This is what allows us to fetch the data from the spoonacular API (more info on this in Further Learning)
```
const fetch = require("node-fetch");
```

* Now this is where the magic happens. Below what we have in our app.js add the following lines of code below what we have already in app.js
```
app.get("/", (req, res) => {
```
So far we are setting up an express route thats saying app (which has been defined as an express object in the declarations at the beginning of the file) is making a "Get" Request to the homepage. (More info and get and Post requests linked below) But for now -think of it as its **getting ** data from the API. We are next going to create a placeholder for food, and add a double check that the "request" equals the food the user entered.
close those curly braces by adding the following:
```
let food = "";
  if (req.query.food) {
    food = req.query.food;
  }
```
* Great, now where the magic happens. We'll need to plug the "food" the user chose into the API call to spoonacular, as well as our own API code to prove we have permissions to access this data. We are using the "fetch" library we brought in earlier to do this. 
Continue first half of that get request by adding the following code:
```
fetch(
    `https://api.spoonacular.com/food/wine/pairing?food=${food}&apiKey=${process.env.API_KEY`
  )
```
* Now that all of the data has been requested, we've got to organize it and put it to use. Paste the following lines of code after your url. 
Here we are saying the response is json data, within this data we're going to grab the "pairing text" from the api and lets call it wine. We want to be able to see this on our home page so we will render it with the home page together. 
```
    .then((response) => response.json())
    .then((data) => {
      const wine = data.pairingText;
      res.render("home", { wine });
        });
    });
```
* Amazing almost there! Last thing we need to do is set up our local host to see this in action. Lets add this next express route:

```
app.listen(3000, () => {
  console.log(` Find your wine pairing at: http://localhost:3000/`);
});
```

* Go ahead and test your app with some of your favorite foods! Run:
```
node app.js
```

## Further Learning 

