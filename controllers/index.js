const path = require('path');
const fs = require('fs');

// print gallery controller
const printGallery = (req, res) => {
      // send images to frontend
      const uploadsDir = path.join(__dirname, '..', 'uploads');

      // Read the contents of the "uploads" folder
      fs.readdir(uploadsDir, (err, files) => {
            // handle error reading the uploads directory
            if (err) {
                  console.error('Error reading uploads directory:', err);
                  return res.status(500).json({ error: 'Internal server error' });
            }

            // Filter out non-image files if needed
            const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

            // Read each image file and send its contents in the response
            const images = imageFiles.map(file => {
                  const filePath = path.join(uploadsDir, file);
                  const data = fs.readFileSync(filePath, 'binary');
                  return { filename: file, data };
            });

            // response object containing images
            res.json({ images });
      });
};

module.exports = { printGallery };