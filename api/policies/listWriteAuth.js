/**
 * listAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow write access to lists
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (!req.isAuthenticated()) {
    return res.forbidden({error: 'You are not permitted to access this list (not signed in).'});
  }

  //If a request passes a second time (e.g. add/remove), because of rearranged params just pass
  if (req.options.canPass) {
    return next();
  }

  var targetListId = req.param('id',undefined);
  var userId = req.session.user.id;

  if(targetListId == undefined) {
    return res.forbidden({error: 'You are not permitted to access this list (missing list id).'});
  }

  List.findOne(targetListId).populate('owners', {id: userId}).exec(function(err, list){
    if (err) {
      return next(err);
    }
    if(list == undefined){
      return res.forbidden({error: 'You are not permitted to access this list.'});
    }
    //User has to be one of the owners
    if(list.owners.length === 1){
      return next();
    }

    return res.forbidden({error: 'You are not permitted to access this list.'});
  });
};
