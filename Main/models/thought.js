const { Schema, model } = require('mongoose');

const ThoughtsSchema = new Schema(
  {
  thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
  },
  createdAt: {
      type: Date,
      default: Date.now,
      // Moment
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
      type: String,
      required: true
  },
  // validate
  reactions: [ReactionsSchema]
  },
  {
  toJSON: {
      virtuals: true,
      getters: true
  },
  id: false
  }
)

// find reaction count
ThoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// creates model
const Thoughts = model('Thoughts', ThoughtsSchema);

// Export model across files
module.exports = Thoughts;
