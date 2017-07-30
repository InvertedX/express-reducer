'use strict';

let should = require('should'),
    express = require('express'),
    request = require('supertest'),
    test = require('../');

let response = [
  {stark: 'arya', lannister: 'tyrion', targaryen: 'daenerys', Greyjoy: 'Theon'},
  {stark: 'rob', lannister: 'jaime', targaryen: 'Viserys', Greyjoy: 'Yara'},
  {stark: 'brandon', lannister: 'tyrion', targaryen: 'Rhaegar', Greyjoy: 'balon'},
  {stark: 'sansa', lannister: 'tyrion', targaryen: 'Aegon', Greyjoy: 'euron'}
]

describe('Array', () => {

  it('Should return mutated Arrays based on pluck params ', done => {
    let server = express()
        .use(test)
        .get('/', (req, res) => res.status(200).json(response).end());
    request(server)
        .get('/?pluck=stark,lannister')
        .expect(200)
        .expect(res => {
          //Expected out put
          let expected = [
            {stark: 'arya', lannister: 'tyrion'},
            {stark: 'rob', lannister: 'jaime'},
            {stark: 'brandon', lannister: 'tyrion'},
            {stark: 'sansa', lannister: 'tyrion'}
          ]

          res.body.should.eql(expected);

          res.headers['content-length'].should.equal(JSON.stringify(expected).length.toString())

        })
        .end(done);
  });


  it('Should return un modified json when no params passed', done => {
    let server = express()
        .use(test)
        .get('/', (req, res) => res.status(200).json(response).end());
    request(server)
        .get('/')
        .expect(200)
        .expect(res => {
          //Expected out put
          let expected = response

          res.body.should.eql(expected);

          res.headers['content-length'].should.equal(JSON.stringify(expected).length.toString())

        })
        .end(done);
  });

  it('Should return un modified other json formats', done => {
    let server = express()
        .use(test)
        .get('/', (req, res) => res.status(200).json(['test', 'test2',1,2,3,5,4,8]).end());
    request(server)
        .get('/')
        .expect(200)
        .expect(res => {
          //Expected out put
          let expected = ['test', 'test2',1,2,3,5,4,8]

          res.body.should.eql(expected);

          res.headers['content-length'].should.equal(JSON.stringify(expected).length.toString())

        })
        .end(done);
  });


})
