import db from '../db';

const Sample = db.sequelize.define('sample', {
  title: {
    type: db.Sequelize.STRING,
    notEmpty: true,
    len: [4, 24],
  },
  age: {
    type: db.Sequelize.INTEGER,
    isInt: true,
    min: 16,
    max: 99,
  },
});

export default Sample;
