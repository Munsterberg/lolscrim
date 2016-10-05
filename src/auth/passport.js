import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcryptjs';

import User from '../models/user';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({where: {id}}).then((user) => {
    done(user);
  }).catch(err => done(err));
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({where: {username: username.toLowerCase()}}).then((user) => {
    if (!user) {
      return done(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }
    return done(null, user);
  }).catch(err => done(err));
}));
