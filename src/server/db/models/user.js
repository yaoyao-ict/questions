import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required for a user'],
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  tag: [String],
});

// Virtual for question's URL
UserSchema
  .virtual('url')
  .get(() => `/user/${this._id}`); //eslint-disable-line

export default mongoose.model('User', UserSchema);
