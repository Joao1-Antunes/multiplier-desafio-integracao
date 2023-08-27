const { dbConnection } = require("./database/database");
const app = require("./app");
const PORT = 8080;

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server is running on port ${PORT}`);
});
