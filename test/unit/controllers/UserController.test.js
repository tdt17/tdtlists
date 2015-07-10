var request = require('supertest');

describe('UserController', function() {
  this.slow(200);
  describe('#get()', function() {
    it('/user should be forbidden', function (done) {
      request(sails.hooks.http.app)
        .get('/user')
        .expect(403,done);
    });
    it('/user/1 should be forbidden', function (done) {
      request(sails.hooks.http.app)
        .get('/user/1')
        .expect(403,done);
    });
  });

});
