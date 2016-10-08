import {Router} from 'express';
import passport from 'passport';

import User from '../../models/user';
import hash from '../../util/hash';

const userRouter = Router(); // eslint-disable-line

userRouter.get('/login', (req, res) => {
  res.render('user/login', {title: 'Login'});
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Login successful');
});

userRouter.get('/register', (req, res) => {
  res.render('user/register', {title: 'Register'});
});

userRouter.post('/register', (req, res) => {
  const {username, password, passwordRepeat} = req.body;

  if (password !== passwordRepeat) {
    res.status(400).send({error: 'Passwords are not matching!'});
    return;
  }

  if (password.length < 4 || password.length > 18) {
    res.status(400).send({error: 'Passwords must be between 4-18 characters long'});
    return;
  }

  const hashedPassword = hash(password);
  const newUser = {username: username.toLowerCase(), password: hashedPassword};

  User
    .build(newUser)
    .save()
    .then(() => {
      res.status(201).send();
    }).catch((e) => {
      if (e) {
        res.status(400).send({error: 'Something went wrong!'});
      }
    });
});

userRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default userRouter;
