// init express instance
const express = require('express');
const app = express();

// import env 
const dotenv = require('dotenv');
dotenv.config();

// environment variables
const PORT = process.env.PORT
const IP = process.env.IP
const NODE_ENV = process.env.NODE_ENV
const IS_LOCAL = NODE_ENV === 'local'

// rate limit handler package
const { rateLimit } = require('express-rate-limit');

// basic packages for server support
const path = require('path');
const cors = require('cors');

const routes = require('./routes/index');

// set options for rateLimiter
const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 1000,
      message: "Too many request. Please try again later."
})

// app.use here
app.use(cors());
app.use(limiter);
app.use('/', routes);
// serve uploads folder with options to protect against attacks
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
      index: false,
      maxAge: '1d'
}));

// server 
if(IS_LOCAL) {
      // if running locally
      app.listen(3001, (err) => {
            if(err) {
                  throw new Error(err)
            }

            console.log('running locally')
      })
} else {
      // if running on railway service
      app.listen(PORT, IP, (err) => {
            if(err) {
                  throw new Error(err)
            } else {
                  console.log('Listening on PORT ' + PORT)
            }
      });
};