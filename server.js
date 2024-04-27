const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');

const routes = require('./routes/index');

app.use(cors());

app.use('/', routes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
      index: false,
      maxAge: '1d'
}));

const server = app.listen(8000);

server.on('error', (error) => {
      console.error('Error running server:', error);
});

server.on('listening', () => {
      console.log('Server running on PORT 8000');
});