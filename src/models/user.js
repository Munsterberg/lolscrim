import db from '../db';

const User = db.sequelize.define('user', {
  username: {
    type: db.Sequelize.STRING,
    unique: true,
    validate: {
      len: [4, 12],
    },
  },
  password: {
    type: db.Sequelize.STRING,
  },
});

export default User;
