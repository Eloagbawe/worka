const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const multer = require('multer');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');

const port = process.env.PORT || 5001;

connectDB();
cloudinaryConfig();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/crafts', multer().any(), require('./routes/craftRoutes'));
app.use('/api/v1/locations', multer().any(), require('./routes/locationRoutes'));


app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server started on port ${port}`.grey);
});
