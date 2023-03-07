const express = require("express");
const app = express();
const db = require("./db/db");

app.use(express.json());

db.sync({ force: false }).then(() => {
  app.listen(3001, () => console.log("Server ON PORT: 3001"));
});
