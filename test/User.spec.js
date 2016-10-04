/* eslint-disable */

import request from 'supertest';
import {expect} from 'chai';

import app from '../src/app';
import User from '../src/models/user';

after((done) => {
  User.destroy({where: {}}).then(() => {
    done();
  });
});

describe('Register spec', () => {
  describe('POST register route', () => {
    it('should register a user to the database', (done) => {
      request(app)
        .post('/api/register')
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
        .post('/api/register')
        .send({
          username: 'username1',
          password: 'password1',
          passwordRepeat: 'password1',
        })
        .end((err, res) => {
          const actualBody = res.text;
          const expectedBody = '{"error":"User already exists"}';

          expect(res.statusCode).to.equal(400);
          expect(actualBody).to.equal(expectedBody);
          done();
        });
    });
  });

  describe('POST register with mismatching passwords', () => {
    it('should fail for mismatching passwords', (done) => {
      request(app)
        .post('/api/register')
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
});

describe('Login spec', () => {
  describe('POST login with username and password', () => {
    it('should login successfully', (done) => {
      request(app)
        .post('/api/login')
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
        .post('/api/login')
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
});
