const router = require('express').Router();
const { printGallery, sendImage } = require('../../controllers/index');

router.get('/gallery', printGallery);
router.get('/sendImage/:imageName', sendImage);

module.exports = router;