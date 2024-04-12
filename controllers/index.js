const path = require('path');
const fs = require('fs');

// print gallery controller
const printGallery = (req, res) => {
      try {
            // path to gallery.json
            const jsonDir = path.join(__dirname, '..', 'json', 'gallery.json');

            // read gallery.json
            const fileData = fs.readFileSync(jsonDir, 'utf-8');

            // parse the data
            const references = JSON.parse(fileData);

            // send the gallery array
            res.json(references.gallery);
            
            // handle error
      } catch (error) {
            console.error('Error retrieving image references: ', error);
            res.status(500).json({ error: 'Internal server error' })
      }
};

// export controllers
module.exports = { printGallery };