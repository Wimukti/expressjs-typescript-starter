const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');

const app = express();

//init middleware
// app.use(logger);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set static folder
app.use(express.static(path.join(__dirname, '../public')));

//clients' ans translaters' routes
app.use('/api/translater', require('./routes/api/translater'));
app.use('/api/clients', require('./routes/api/clients'));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(() => `server started on port ${PORT}`)
);
