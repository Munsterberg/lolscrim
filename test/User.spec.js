/* eslint-disable */

import request from 'supertest';
import {expect} from 'chai';

import app from '../src/app';
import models from '../src/models';

after((done) => {
  models.user.destroy({where: {}}).then(() => {
    done();
  });
});

describe('Register spec', () => {
  describe('POST register route', () => {
    it('should register a user to the database', (done) => {
      request(app)
        .post('/register')
        .send({
          username: 'username1',
          password: 'password1',
          passwordRepeat: 'password1',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
  });

  describe('POST register with same username', () => {
    it('should fail to register with same username', (done) => {
      request(app)
        .post('/register')
        .send({
          username: 'username1',
          password: 'password1',
          passwordRepeat: 'password1',
        })
        .end((err, res) => {
          const actualBody = res.text;
          const expectedBody = '{"error":"Something went wrong!"}';

          expect(res.statusCode).to.equal(400);
          expect(actualBody).to.equal(expectedBody);
          done();
        });
    });
  });

  describe('POST register with mismatching passwords', () => {
    it('should fail for mismatching passwords', (done) => {
      request(app)
        .post('/register')
        .send({
          username: 'username2',
          password: 'password2',
          passwordRepeat: 'password1',
        })
        .end((err, res) => {
          const actualBody = res.text;
          const expectedBody = '{"error":"Passwords are not matching!"}';

          expect(res.statusCode).to.equal(400);
          expect(actualBody).to.equal(expectedBody);
          done();
        });
    });
  });

  describe('POST register with too short password', () => {
    it('should fail for too short of password', (done) => {
      request(app)
        .post('/register')
        .send({
          username: 'username3',
          password: '123',
          passwordRepeat: '123',
        })
        .end((err, res) => {
          const actualBody = res.text;
          const expectedBody = '{"error":"Passwords must be between 4-18 characters long"}';

          expect(res.statusCode).to.equal(400);
          expect(actualBody).to.equal(expectedBody);
          done();
        });
    });
  });

  describe('POST register with long password', () => {
    it('should fail for too long of password', (done) => {
      request(app)
        .post('/register')
        .send({
          username: 'username3',
          password: '1234567891234567891',
          passwordRepeat: '1234567891234567891',
        })
        .end((err, res) => {
          const actualBody = res.text;
          const expectedBody = '{"error":"Passwords must be between 4-18 characters long"}';

          expect(res.statusCode).to.equal(400);
          expect(actualBody).to.equal(expectedBody);
          done();
        });
    });
  });

  describe('render register form to view', () => {
    it('should render form along with view', (done) => {
      request(app)
        .get('/register')
        .end((err, res) => {
          const actualBody = res.text;

          expect(actualBody).to.contain('<h1>Register Page</h1>');
          expect(res.statusCode).to.equal(200);
          expect(actualBody).to.contain('<form method="post" action="/register">');
          done();
        });
    });
  });
});

describe('Login spec', () => {
  describe('POST login with username and password', () => {
    it('should login successfully', (done) => {
      request(app)
        .post('/login')
        .send({
          username: 'username1',
          password: 'password1'
        })
        .end((err, res) => {
          const actualBody = res.text;
          const expectedBody = 'Login successful';

          expect(res.statusCode).to.equal(200);
          expect(actualBody).to.equal(expectedBody);
          done();
        });
    });
  });

  describe('POST login with wrong password', () => {
    it('should fail logging in with wrong password', (done) => {
      request(app)
        .post('/login')
        .send({
          username: 'username1',
          password: 'password2'
        })
        .end((err, res) => {
          const actualBody = res.text;
          const expectedBody = 'Unauthorized';

          expect(res.statusCode).to.equal(401);
          expect(actualBody).to.equal(expectedBody);
          done();
        });
    });
  });

  describe('render login page', () => {
    it('should render login form in view', (done) => {
      request(app)
        .get('/login')
        .end((err, res) => {
          const actualBody = res.text;

          expect(res.statusCode).to.equal(200);
          expect(actualBody).to.contain('<h1>Login Page</h1>');
          expect(actualBody).to.contain('<form method="post" action="/login">');
          done();
        });
    });
  });
});
