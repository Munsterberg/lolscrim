/* eslint-disable */

import request from 'supertest';
import session from 'supertest-session';
import {expect} from 'chai';

import app from '../src/app';
import models from '../src/models';

let testSession = null;

after((done) => {
  models.team.destroy({where: {}}).then(() => {
    done();
  });
});

before((done) => {
  testSession = session(app);
  done();
});

describe('Team spec while not authenticated', () => {
  describe('GET /create-team while not authenticated', () => {
    it('should redirect to /login', (done) => {
      request(app)
        .get('/create-team')
        .end((err, res) => {
          const actualBody = res.text;

          expect(res.statusCode).to.equal(302);
          expect(actualBody).to.contain('Redirecting to /login');
          done();
        });
    });
  });

  describe('Team spec while authenticated', () => {
    it('should register test user', (done) => {
      testSession.post('/register')
        .send({username: 'teamuser1', password: 'password1', passwordRepeat: 'password1'})
        .end(done)
    });
    it('should login to test user', (done) => {
      testSession.post('/login')
        .send({username: 'teamuser1', password: 'password1'})
        .end(done)
    });
    describe('GET /create-team while authenticated', () => {
      it('should render the view', (done) => {
        testSession.get('/create-team')
          .end((err, res) => {
            const actualBody = res.text;

            expect(res.statusCode).to.equal(200);
            expect(actualBody).to.contain('<h1>Create Team</h1>');
            done();
          });
      });
    });
  });
});
