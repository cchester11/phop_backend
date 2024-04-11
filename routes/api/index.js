const router = require('express').Router();
const { printGallery } = require('../../controllers/index');

router.get('/gallery', printGallery);

module.exports = router;