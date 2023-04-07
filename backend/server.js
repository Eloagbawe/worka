const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const multer = require('multer');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

const port = process.env.PORT || 5001;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(multer().array());


app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server started on port ${port}`.grey);
});
