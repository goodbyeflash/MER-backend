import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const contentSchema = new Schema({
  contentId: String,
  userId: String,
  data : Object,
  publishedDate: {
    type: String,
    default: moment().format(),
  },
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
