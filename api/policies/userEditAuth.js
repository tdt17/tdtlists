/**
 * userEditAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow user access to edit their data
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (!req.isAuthenticated()) {
    return res.forbidden({error: 'You are not permitted to access this user (not signed in).'});
  }

  var targetUserId = req.params.id;
  var userId = req.session.user.id;

  if(targetUserId != userId) {
    return res.forbidden({error: 'You are not permitted to access this user.'});
  }

  return next();
};
