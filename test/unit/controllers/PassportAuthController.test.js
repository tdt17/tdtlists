var request = require('supertest');

describe('PassportController', function() {
  this.slow(500);

  describe('#login()', function() {
    it('user with wrong credentials should be forbidden', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({username: 'test', password: 'wrong password'})
        .expect(403, done);
    });
    it('user with right credentials can login', function (done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({username: 'test', password: 'test123'})
        .expect(200,done);
    });
  });

});
