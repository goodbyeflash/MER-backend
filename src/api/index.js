import Router from 'koa-router';
import users from './users';
import teacher from './teacher';

const api = new Router();

api.use('/users', users.routes());
api.use('/teacher', teacher.routes());

// 라우터를 내보냅니다.
export default api;
