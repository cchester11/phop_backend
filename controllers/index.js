const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', 'uploads'))
      },
      filename: (req, file, cb) => {
            cb(null, file.originalname)
      }
});

const upload = multer({ storage });

// print gallery controller
const printGallery = (req, res) => {
      // send images to frontend
      upload.array('images')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                  return res.status(400).json({ error: 'File upload error' });
            } else if (err) {
                  return res.status(500).json({ error: 'Internal server error' });
            }

            res.json({ message: 'Images uploaded successfully' });
      });
};

module.exports = { printGallery };