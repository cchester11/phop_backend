// init express instance
const express = require('express');
const app = express();

// rate limit handler package
const { rateLimit } = require('express-rate-limit');

// basic packages for server support
const path = require('path');
const cors = require('cors');

const routes = require('./routes/index');

// set options for rateLimiter
const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      // limit: 200,
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
const server = app.listen(8000);

server.on('error', (error) => {
      console.error('Error running server:', error);
});

server.on('listening', () => {
      console.log('Server running on PORT 8000');
});