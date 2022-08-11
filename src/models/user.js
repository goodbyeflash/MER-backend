import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const userSchema = new Schema({
  name: String,
  sex: String,
  age: String,
  address: String,
  schoolName: String,
  schoolCode: String,
  type: String,
  grade: String,
  ip : String,
  publishedDate: {
    type: Date,
    default: moment().format(),
  },
  user: {
    _id: mongoose.Types.ObjectId,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
