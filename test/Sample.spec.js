/* eslint-disable */

import request from 'supertest';
import {expect} from 'chai';

import app from '../src/app';
import Sample from '../src/models/sample';

before((done) => {
  Sample
    .destroy({where: {}}).then(() => {
      Sample.build({title: 'A test book', age: 21})
      .save()
      .then((newSample) => {
        console.log('New test sample created');
      }).catch((error) => {
        console.log(error);
      });
      done();
    })
});

after((done) => {
  Sample.destroy({where: {}}).then(() => {
    done();
  });
});

describe('Sample spec', () => {
  describe('GET all sample entries', () => {
    it('should return all sample entries in db', (done) => {
      request(app)
        .get('/api/sample')
        .end((err, res) => {
          const body = res.body[0];
          expect(res.statusCode).to.equal(200);
          expect(res.type).to.equal('application/json');
          expect(body.title).to.equal('A test book');
          expect(body.age).to.equal(21)
          done();
        });
    });
  });

  describe('POST an entry to sample', () => {
    it('should post an entry to the sample table in the test database', (done) => {
      request(app)
        .post('/api/sample')
        .send({title: 'A brand new test book', age: 41})
        .end((err, res) => {
          const body = res.body;
          expect(res.statusCode).to.equal(200);
          expect(body.title).to.equal('A brand new test book');
          expect(body.age).to.equal(41);
          done();
        });
    });
  });
});
