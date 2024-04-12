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

const sendImage = (req, res) => {
      // grab param
      const imageName = req.params.imageName;
      // path to image based on param 
      const imagePath = path.join(__dirname, '..', 'uploads', imageName);

      // if path to image exist, pipe image to client
      if (fs.existsSync(imagePath)) {
            res.setHeader('Content-Type', 'image/jpeg')

            fs.createReadStream(imagePath).pipe(res);
      } else {
            // else send error
            res.status(404).json({ 
                  error: "Image not found",
                  imageName: imageName,
                  imagePath: imagePath
            })
      }
};

// export controllers
module.exports = { printGallery, sendImage };