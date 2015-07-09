/**
 * listReadAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow read access to lists
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  // User is not allowed
  function forbidden() {
    return res.json(403,'You are not permitted to access this list.');
  }

  var targetListId = req.param('id');
  var password = req.param('password');
  var userId = -1;

  if (req.session.authenticated) {
    userId = req.session.user.id;
  }

  List.findOne(targetListId).populate('owners', userId).exec(function(err, list){
    if (err) {
      return next(err);
    }
    //As Owner has access
    if(list.owners.length === 1){
      next();
    }
    //No password defined (readable for all) or user entered password
    if('password' in list){
      if(password == list.password){
        next();
      }
    }else{
      next();
    }
  });

  return forbidden();
};
