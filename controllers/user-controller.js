const { user, thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    user.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    user.findOne({ _id: req.params.id })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    user.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a user
  updateUser(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    user.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID!' })
          : thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Add a new friend to users friend list
  addFriend(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.id }, 
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true } )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a new friend to users friend list
  deleteFriend(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.id }, 
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true } )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }
};