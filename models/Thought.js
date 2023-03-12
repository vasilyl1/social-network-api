const { Schema, model } = require('mongoose');

// Schema for what makes up a reaction
const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId }, // check for default option here
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: (date) => timeSince(date) }
  },
  {
      toJSON: {
        virtuals: true
      },
      id: false
  }
  );

// Schema for what makes up a thought
const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, get: (date) => timeSince(date) },
  username: { type: String, required: true },
  reactions: [{ type: Schema.Types.ObjectId, ref: reactionSchema }]
},
{
    toJSON: {
      virtuals: true
    },
    id: false
}
);

// Virtual property `reactionCount` that returns the length of reactions array on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;