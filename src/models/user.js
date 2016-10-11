export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [4, 12],
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        User.belongsTo(models.team);
      },
    },
  });
  return User;
};
