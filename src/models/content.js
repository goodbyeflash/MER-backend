import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const contentSchema = new Schema({
  contentId: String,
  userId: String,
  sex: String,
  age: String,
  address: String,
  type: String,
  data : Object,
  publishedDate: {
    type: Date,
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
