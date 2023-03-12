const { Schema, model } = require('mongoose');

// Schema to create Post model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: '/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/'},
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// Virtual property `friendCount` that returns the number of friends of the user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;