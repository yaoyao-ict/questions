import mongoose from 'mongoose';

const { Schema } = mongoose;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required for a question'],
  },
  detail: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  useless: [String],
});

// Virtual for question's URL
QuestionSchema
  .virtual('url')
  .get(() => `/question/${this._id}`); //eslint-disable-line


export default mongoose.model('Question', QuestionSchema);
