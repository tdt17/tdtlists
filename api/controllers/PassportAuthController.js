// Credit:
// @theangryangel https://gist.github.com/theangryangel/5060446
// @Mantish https://gist.github.com/Mantish/6366642
// @anhnt https://gist.github.com/anhnt/8297229

var passport = require('passport');

var PassportAuthController = {

  loginPage: function (req,res) {
    return res.view('auth/login', {});
  },

  login: function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.json(403,{
          message: info.message
        });
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.json(user);
      });
    })(req, res, next);
  },

  logout: function(req,res) {
    req.logout();
    res.json({ok: true});
  }

};

module.exports = PassportAuthController;
