import Sequelize from 'sequelize';
import {dbConfig, testDbConfig} from '../config';

let sequelize = null;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(testDbConfig.dbName, 'postgres', '', {
    host: testDbConfig.host,
    dialect: 'postgres',
    port: testDbConfig.port,
  });
} else {
  sequelize = new Sequelize(dbConfig.dbName, 'postgres', '', {
    host: dbConfig.host,
    dialect: 'postgres',
    port: dbConfig.port,
  });
}

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
