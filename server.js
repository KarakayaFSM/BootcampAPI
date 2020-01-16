const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Routes
const bootcamps = require('./routes/bootcamps');

//load env vars
dotenv.config({ path:'./config/config.env' });

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps',bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} in  ${process.env.NODE_ENV} mode`);
});