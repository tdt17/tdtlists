/**
 * listAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow access to lists
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  // User is not allowed
  function forbidden() {
    return res.json(403,'You are not permitted to access this list.');
  }

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (!req.session.authenticated) {
    return forbidden();
  }

  var targetListId = req.param('id');
  var password = req.param('password');
  var userId = req.session.user.id;

  List.findOne(targetListId).populate('owners', {id: userId}).exec(function(err, list){
    if (err) {
      return next(err);
    }
    //User has to be one of the owners
    if(list.owners.length === 1){
      next();
    }
  });

  return forbidden();
};
