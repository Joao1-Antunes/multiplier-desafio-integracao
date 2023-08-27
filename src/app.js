const express = require("express");
const app = express();

app.use(express.json());

// router
const router = require("./routes/router");
app.use("/api/", router);

module.exports = app;