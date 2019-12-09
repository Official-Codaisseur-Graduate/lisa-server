const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { dbSync } = require("./db");
const createDishTypes = require("./dishTypeData");
const createLocations = require("./locationData");

const dishRouter = require("./dish-table/routes");
const typeRouter = require("./type-table/routes");
const menuRouter = require("./menu-table/routes");
const googleRouter = require("./google/routes");
const locationRouter = require("./location-table/routes");

const app = express();
const port = process.env.PORT || 5000;

require("./modelRelations");
require("./dishesData");

dbSync().then(() => {
  console.log("Connected to database");
  createDishTypes();
  createLocations();
});

app
  .use(cors())
  .use(bodyParser.json())
  .use(dishRouter)
  .use(typeRouter)
  .use(menuRouter)
  .use(googleRouter)
  .use(locationRouter);

app.listen(port, console.log(`listen to port ${port}`));
console.log("TEST2");
