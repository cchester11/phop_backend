const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');

app.use(cors());

app.use('/photos', express.static(path.join(__dirname, 'assets')))

app.listen(8000, (error) => {
      if(error) {
            console.error('Error running server: ', error)
      }

      console.log('Server running on PORT 8000')
})