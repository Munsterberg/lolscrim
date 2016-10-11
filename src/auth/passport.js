import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcryptjs';

import models from '../models';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.user.findById(id).then((user) => {
    done(null, user);
  }).catch(err => done(err, null));
});

passport.use(new LocalStrategy((username, password, done) => {
  models.user.findOne({where: {username: username.toLowerCase()}}).then((user) => {
    if (!user) {
      return done(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }
    return done(null, user);
  }).catch(err => done(err));
}));
