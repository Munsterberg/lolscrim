import {Router} from 'express';
import passport from 'passport';

import User from '../../models/user';
import hash from '../../util/hash';

const userRouter = Router(); // eslint-disable-line

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Login successful');
});

userRouter.post('/register', (req, res) => {
  const {username, password, passwordRepeat} = req.body;

  if (password !== passwordRepeat) {
    res.status(400).send({error: 'Passwords are not matching!'});
    return;
  }

  const hashedPassword = hash(password);
  const newUser = {username, password: hashedPassword};

  User
    .build(newUser)
    .save()
    .then(() => {
      res.status(201).send();
    }).catch((e) => {
      if (e) {
        res.status(400).send({error: 'User already exists'});
      }
    });
});

export default userRouter;
