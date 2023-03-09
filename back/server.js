const express = require("express");
const app = express();
const db = require("./db/db");
const models = require("./models");
const router = require("./routes/index");
const cors = require("cors")
const cookiesParser = require("cookie-parser")

app.use(cookiesParser())
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
  credentials: true
}));

app.use(express.json());
app.use("/", router);


db.sync({ force: false }).then(() => {
  app.listen(3001, () => console.log("Server ON PORT: 3001"));
});
