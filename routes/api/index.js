const router = require('express').Router();
const userRoutes = require('./postRoutes');
const thoughtRoutes = require('./commentRoutes');
const friendRoutes = require('friendRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/friends', friendRoutes);

module.exports = router;