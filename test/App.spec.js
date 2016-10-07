/* eslint-disable */

import app from '../src/app';
import {expect} from 'chai';
import request from 'supertest';

describe('GET 404 on no URL', () => {
  it('should return a 404', (done) => {
    request(app)
      .get('/NoUrlHere')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});

describe('GET /', () => {
  it('should return the index view', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.text).to.contain('<h1>Index Page</h1>');
        done();
      });
  });
});
