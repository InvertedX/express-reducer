'use strict';

let should = require('should'),
    express = require('express'),
    request = require('supertest'),
    test = require('../');

describe ('JSON', () => {

    it('Should return mutated json based on pluck params ', done => {
        let server = express()
            .use(test)
            .get('/', (req, res) => res.status(200).json({ a: 'a' ,b : 'b',c : 'c'}).end());
        request(server)
            .get('/?pluck=a,b')
            .expect(200)
            .expect(res => {
                //Expected out put
                let expected = { a: 'a' ,b : 'b' }

                res.body.should.eql(expected);

                res.headers['content-length'].should.equal(JSON.stringify(expected).length.toString())

            })
            .end(done);
    });

    it('Should return un modified Object when no params passed', done => {
    let server = express()
        .use(test)
        .get('/', (req, res) => res.status(200).json({ a: 'a' ,b : 'b',c : 'c'}).end());
    request(server)
        .get('/')
        .expect(200)
        .expect(res => {
          //Expected out put
          let expected = { a: 'a' ,b : 'b',c : 'c'}

          res.body.should.eql(expected);

          res.headers['content-length'].should.equal(JSON.stringify(expected).length.toString())

        })
        .end(done);
  });

})
