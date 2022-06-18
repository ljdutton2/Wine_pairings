const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log(` Find your wine pairing at: http://localhost:3000/`);
});
