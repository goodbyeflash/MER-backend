import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  sex: String,
  age: String,
  address: String,
  schoolName: String,
  schoolCode: String,
  type: String,
  grade: String,
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
