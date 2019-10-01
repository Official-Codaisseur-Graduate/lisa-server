const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dishRouter = require('./dish-table/routes');
const typeRouter = require('./type-table/routes');
const menuRouter = require('./menu-table/routes');
const hooksRouter = require('./hooks');
const googleRouter = require('./google/routes')

const app = express();
const port = process.env.PORT || 5000;

app
  .use(cors())
  .use(bodyParser.json())
  .use(dishRouter)
  .use(typeRouter)
  .use(menuRouter)
  .use(hooksRouter)
  .use(googleRouter)

app.listen(port, console.log(`listen to port ${port}`));
