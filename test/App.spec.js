/* eslint-disable */

import app from '../src/app';
import {expect} from 'chai';
import request from 'supertest';

describe('GET 404 on no URL', () => {
  it('should return a 404', (done) => {
    request(app)
      .get('/NoUrlHere')
      .expect(404)
      .expect('Content-Type', 'text/html; charset=utf-8', done)
  });
});

describe('GET /', () => {
  it('should return Hola', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end((err, res) => {
        expect(res.text).to.equal('Hola');
        done();
      });
  });
});
