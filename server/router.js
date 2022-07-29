const router = require('express').Router();
const thumbnailController = require('./controllers/thumbnail');
const userController = require('./controllers/user');
const authMiddleware = require('./middlewares/auth');

router.get('/thumbnail/:userId', thumbnailController.getThumbnails);
router.post('/thumbnail', thumbnailController.postThumbnail);
router.put('/thumbnail', thumbnailController.updateThumbnail);
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/logout', authMiddleware, userController.logout);
router.get('/user', authMiddleware, userController.getUserInfo);

module.exports = router;