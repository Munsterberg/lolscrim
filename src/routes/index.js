import {Router} from 'express';

const homeRouter = Router(); // eslint-disable-line

homeRouter.get('/', (req, res) => {
  res.render('index', {title: 'Home'});
});

export default homeRouter;
