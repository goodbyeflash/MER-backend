import Router from 'koa-router';
import users from './users';
import teacher from './teacher';
import content from './content';

const api = new Router();

api.use('/users', users.routes());
api.use('/teacher', teacher.routes());
api.use('/content', content.routes());

// 라우터를 내보냅니다.
export default api;
