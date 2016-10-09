export default (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    teamName: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [3, 16],
      },
    },
    teamRegion: {
      type: DataTypes.STRING,
    },
    teamCaptain: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 12],
      },
    },
    memberTwo: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 12],
      },
    },
    memberThree: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 12],
      },
    },
    memberFour: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 12],
      },
    },
    memberFive: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 12],
      },
    },
  }, {
    classMethods: {
      associate(models) {
        Team.hasMany(models.user);
      },
    },
  });
  return Team;
};
