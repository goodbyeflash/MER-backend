import Router from 'koa-router';
import * as contentCtrl from './content.ctrl';

const contents = new Router();

contents.post('/check', contentCtrl.getUserById, contentCtrl.check);
contents.post('/register', contentCtrl.getUserById, contentCtrl.write);
contents.patch('/:id', contentCtrl.getUserById, contentCtrl.update);


export default contents;
