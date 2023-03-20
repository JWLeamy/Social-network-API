//require the express router
const router = require('express').Router();

// Set both user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add '/user'
router.use('/user', userRoutes);

// add '/thought'
router.use('/thought', thoughtRoutes);

module.exports = router;
