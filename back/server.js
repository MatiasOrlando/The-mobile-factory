const express = require("express");
const app = express();
const db = require("./db/db");
const models = require("./models");
const router = require("./routes/index")

app.use(express.json());
app.use("/", router)


db.sync({ force: false }).then(() => {
  app.listen(3001, () => console.log("Server ON PORT: 3001"));
});
