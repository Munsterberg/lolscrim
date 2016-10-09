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
  describe('GET /team/new while not authenticated', () => {
    it('should redirect to /login', (done) => {
      request(app)
        .get('/team/new')
        .end((err, res) => {
          const actualBody = res.text;

          expect(res.statusCode).to.equal(302);
          expect(actualBody).to.contain('Redirecting to /login');
          done();
        });
    });
  });
  describe('POST /team/new while not authenticated', () => {
    it('should not be able to post a team', (done) => {
      testSession.post('/team/new')
        .send({
          teamName: 'Test Team',
          teamCaptain: 'Any',
          teamRegion: 'na',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(302);
          expect(res.text).to.contain('Redirecting to /login');
          done();
        });
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
  describe('GET /team/new while authenticated', () => {
    it('should render the view', (done) => {
      testSession.get('/team/new')
        .end((err, res) => {
          const actualBody = res.text;

          expect(res.statusCode).to.equal(200);
          expect(actualBody).to.contain('<h1>Create Team</h1>');
          done();
        });
    });
  });
  describe('POST /team/new while authenticated', () => {
    it('should post a team to the database', (done) => {
      testSession.post('/team/new')
        .send({
          teamName: 'Test Team',
          teamCaptain: 'Any',
          teamRegion: 'na',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
  });
});
