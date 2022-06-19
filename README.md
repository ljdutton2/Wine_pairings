# Wine Not? Wine Pairing App

## What is Wine Not?

Wine not? is a node.js application that allows the user to enter the name of an ingredient, meal or cuisine resulting in a proper wine pairing explanation and reccomendation. Use Wine Not to always know which wine to drink with your meal!

## Requirements

* Node.js
* Express & Handlebars
* Git
* Spoonacular API found here: https://spoonacular.com/food-api/docs#Wine-Pairing


## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
cd the-example-app.nodejs
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.


## Steps for read and write access (recommended)

Step 1: Install the [Contentful CLI](https://www.npmjs.com/package/contentful-cli)

Step 2: Login to Contentful through the CLI. It will help you to create a [free account](https://www.contentful.com/sign-up/) if you don't have one already.
```
contentful login
```
Step 3: Create a new space
```
contentful space create --name 'My space for the example app'
```
Step 4: [Seed](https://github.com/contentful/contentful-cli/tree/master/docs/space/seed) the new space with the example content model [`the-example-app`](https://github.com/contentful/content-models/tree/master/the-example-app). Replace the `SPACE_ID` with the id returned from the create command executed in step 3
```
contentful space seed -s '<SPACE_ID>' -t the-example-app
```
Step 5: Head to the Contentful web app's API section and grab `SPACE_ID`, `DELIVERY_ACCESS_TOKEN`, `PREVIEW_ACCESS_TOKEN`.

Step 6: Open `variables.env` and inject your credentials so it looks like this

```
NODE_ENV=development
CONTENTFUL_SPACE_ID=<SPACE_ID>
CONTENTFUL_DELIVERY_TOKEN=<DELIVERY_ACCESS_TOKEN>
CONTENTFUL_PREVIEW_TOKEN=<PREVIEW_ACCESS_TOKEN>
PORT=3000
```

Step 7: To start the express server, run the following
```bash
npm run start:dev
```
Final Step:

Open [http://localhost:3000?editorial_features=enabled](http://localhost:3000?editorial_features=enabled) and take a look around. This URL flag adds an “Edit” button in the app on every editable piece of content which will take you back to Contentful web app where you can make changes. It also adds “Draft” and “Pending Changes” status indicators to all content if relevant.

## Deploy to Heroku
You can also deploy this app to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
```

Step 2: Build the Docker image

```bash
docker build -t the-example-app.nodejs .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 -d the-example-app.nodejs
```

If you created your own Contentful space, you can use it by overriding the following environment variables:

```bash
docker run -p 3000:3000 \
  -e CONTENTFUL_SPACE_ID=<SPACE_ID> \
  -e CONTENTFUL_DELIVERY_TOKEN=<DELIVERY_ACCESS_TOKEN> \
  -e CONTENTFUL_PREVIEW_TOKEN=<PREVIEW_ACCESS_TOKEN> \
  -d the-example-app.nodejs
```
​