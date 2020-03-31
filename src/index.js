const express = require('express');
const app = express();
const path = require('path');

//Set Static Folder
app.use(express.static(path.join(__dirname, '../public')));



const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(() => `server started on port ${PORT}`)
);
