/**
 * listReadAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow read access to lists
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  var targetListId = req.param('id',undefined);
  var password = req.param('password');
  var userId = -1;

  if (req.isAuthenticated()) {
    userId = req.session.user.id;
  }

  if(targetListId == undefined) {
    return res.forbidden({error: 'You are not permitted to access this list (missing list id).'});
  }

  List.findOne(targetListId).populate('owners', userId).exec(function(err, list){
    if (err) {
      return next(err);
    }
    if(list == undefined){
      return res.forbidden({error: 'You are not permitted to access this list.'});
    }
    //Owner has access
    if(list.owners.length === 1){
      return next();
    }
    //No password defined (readable for all) or user entered password
    if('password' in list){
      if(password == list.password){
        return next();
      }
    }else{
      return next();
    }

    return res.forbidden({error: 'You are not permitted to access this list.'});
  });
};
