const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');

const routes = require('./routes/index');

app.use(cors());

app.use('/', routes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(8000, (error) => {
      if(error) {
            console.error('Error running server: ', error)
      }

      console.log('Server running on PORT 8000')
});