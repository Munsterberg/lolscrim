# theboiler

> This is primarily for personal projects but feel free to clone and use.

## Features
- eslint
- express (with exported app for testing)
- sequelize for postgreSQL ORM
- morgan and winston for logging
- supertest, chai used with mocha for testing
- basic app tests written


### Setting up databases
You will need to create a `config.js` file in the src/ directory.

With this file created you can fill out the following for using a postgres dev
database and a test one. You can add more info here if you'd like, for example
`username: 'pgUser'`. Here is what my config.js file looks like:
```
export const testDbConfig = {
  dbName: 'boilerdb_test',
  host: 'localhost',
  port: 5432,
  password: 'password',
};

export const dbConfig = {
  dbName: 'boilerdb',
  host: 'localhost',
  port: 5432,
  password: 'password',
};
```
