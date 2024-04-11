const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

app.listen(8000, (error) => {
      if(error) {
            console.error('Error running server: ', error)
      }

      console.log('Server running on PORT 8000')
})