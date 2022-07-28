const router = require('express').Router();
const thumbnailController = require('./controllers/thumbnail');

router.get('/thumbnail/:userId', thumbnailController.getThumbnails);
router.post('/thumbnail', thumbnailController.postThumbnail);
router.put('/thumbnail', thumbnailController.updateThumbnail);

module.exports = router;