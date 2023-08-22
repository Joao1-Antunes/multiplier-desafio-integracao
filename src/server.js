const express = require('express');
const app = express();
const dbConnection = require("./database/database");

app.use(express.json());

const PORT = 8080;

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server is running on port ${PORT}`);

})