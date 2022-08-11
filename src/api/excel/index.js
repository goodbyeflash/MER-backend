import Router from 'koa-router';
import * as excelCtrl from './excel.ctrl';

const excels = new Router();

excels.get('/download', excelCtrl.download);
// teachers.post('/find', teacherCtrl.find);
// teachers.get('/:id', teacherCtrl.getTeacherById, teacherCtrl.read);
// teachers.patch('/:id', checkLoggedIn, teacherCtrl.update);
// teachers.delete('/:id', checkLoggedIn, teacherCtrl.remove);

export default excels;
