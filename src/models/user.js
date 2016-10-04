import db from '../db';

const User = db.sequelize.define('user', {
  username: {
    type: db.Sequelize.STRING,
    notEmpty: true,
    len: [4, 12],
    unique: true,
  },
  password: {
    type: db.Sequelize.STRING,
    notEmpty: true,
    len: [5, 18],
  },
  registrationDate: {
    type: db.Sequelize.DATE,
  },
});

export default User;
