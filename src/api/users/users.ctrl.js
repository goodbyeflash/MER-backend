import User from '../../models/user';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

export const getUserById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const user = await User.findById(id);
    // 선생이 존재하지 않을 때
    if (!user) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.user = user;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/users?page=
*/
export const list = async (ctx) => {
  // query는 문자열이기 때문에 숫자로 변환해 주어야 합니다.
  // 값이 주어지지 않았다면 1을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const users = await User.find({})
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const userCount = await User.countDocuments({}).exec();
    ctx.set('Last-Page', Math.ceil(userCount / 10));
    ctx.body = users.map((user) => user.toJSON());
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  GET /api/users/:id
*/
export const read = async (ctx) => {
  ctx.body = ctx.state.user;
};

/*
  POST /api/users
  {
    "name" : "홍길동",
    "sex" : "남",
    "age" : "12세",
    "address" : "서울시",
    "schoolName" : "면목",
    "schoolCode" : "S000000",
    "type" : "초등학교",
    "grade" : "1학년"
  }
 */
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    name: Joi.string().required(), // required()가 있으면 필수 항목
    sex: Joi.string().required(),
    age: Joi.string().required(),
    address: Joi.string().required(),
    schoolName: Joi.string(),
    schoolCode: Joi.string(),
    type: Joi.string().required(),
    grade: Joi.string().required(),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  const { name, sex, age, address, schoolName, schoolCode, type, grade } =
    ctx.request.body;
  const user = new User({
    name,
    sex,
    age,
    address,
    schoolName,
    schoolCode,
    type,
    grade,
  });

  try {
    await user.save();
    ctx.body = user;
  } catch (error) {
    ctx.throw(500, error);
  }
};