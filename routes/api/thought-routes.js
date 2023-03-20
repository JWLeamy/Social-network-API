const router = require('express').Router();
const {
  createThoughts,
  getAllThoughts,
  getThoughtsById,
  updateThoughts,
  deleteThoughts,
} = require('../../controllers/thought-controller.js');

const {
  addReaction
} = require('../../controllers/thought-controller.js');
// -- Provides get route for all thoughts
router.route('/').get(getAllThoughts);

// -- routes to all Get, Put, and delete routes for INDIVIDUAL thoughts
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

// -- routes to post route in order to create a new thought
router.route('/:userId').post(createThoughts);

// -- allows for rections (using schema rather than its own route)
router.route('/:thoughtId/reactions').post(addReaction);

// -- deletes reactions
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;