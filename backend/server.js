const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');
const { upload } = require('./services/imageUpload');

const port = process.env.PORT || 5001;

connectDB();
cloudinaryConfig();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(upload);
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/crafts', require('./routes/craftRoutes'));
app.use('/api/v1/locations', require('./routes/locationRoutes'));
app.use('/api/v1/reviews', require('./routes/reviewRoutes'));
app.use('/api/v1/bookings', require('./routes/bookingRoutes'));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server started on port ${port}`.grey);
});
