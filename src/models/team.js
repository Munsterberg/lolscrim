import db from '../db';
import User from './user';

const Team = db.sequelize.define('team', {
  teamName: {
    type: db.Sequelize.STRING,
    unique: true,
    validate: {
      len: [4, 16],
    },
  },
  teamCaptain: {
    type: db.Sequelize.STRING,
    validate: {
      len: [4, 12],
    },
  },
  memberTwo: {
    type: db.Sequelize.STRING,
    validate: {
      len: [4, 12],
    },
  },
  memberThree: {
    type: db.Sequelize.STRING,
    validate: {
      len: [4, 12],
    },
  },
  memberFour: {
    type: db.Sequelize.STRING,
    validate: {
      len: [4, 12],
    },
  },
  memberFive: {
    type: db.Sequelize.STRING,
    validate: {
      len: [4, 12],
    },
  },
});

Team.hasMany(User, {as: 'Players'});

export default Team;
