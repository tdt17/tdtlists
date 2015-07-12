/**
 * ListController
 *
 * @description :: Server-side logic for managing Lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addEntry: function (req, res, next) {
    var targetListId = req.param("id",null);
    var data = req.param('data',{});
    if(typeof data != 'object'){
      return res.forbidden('no data object');
    }

    List.findOne(targetListId).exec(function(err, list){
      if (err) {
        return next(err);
      }

      var newData = list.addEntry(data);
      list.save(function(err, list) {
        if (err) {
          return next(err);
        }

        return res.json(200, {
          ok: true,
          newData: newData
        });
      });
    });
  },

  updateEntry: function (req, res, next) {
    var targetListId = req.param("id",null);
    var data = req.param('data',{});
    if(typeof data != 'object'){
      return res.forbidden('no data object');
    }

    data.id = parseInt(req.params.entryId);

    List.findOne(targetListId).exec(function(err, list){
      if (err) {
        return next(err);
      }

      var oldData = list.updateEntry(data);
      list.save(function(err, list) {
        if (err) {
          return next(err);
        }

        return res.json(200, {
          ok: true,
          oldData: oldData
        });
      });
    });
  },

  removeEntry: function (req, res, next) {
    var targetListId = req.param("id",null);
    var data = {id: parseInt(req.params.entryId)};

    List.findOne(targetListId).exec(function(err, list){
      if (err) {
        return next(err);
      }

      var oldData = list.removeEntry(data);
      list.save(function(err, list) {
        if (err) {
          return next(err);
        }

        return res.json(200, {
          ok: true,
          oldData: oldData
        });
      });
    });
  },

  authorizeAdd: function(req, res, next) {
    req.options.alias = "owners";
    req.options.model = "list";
    req.options.canPass = true;
    return next();
  },

  authorizeRemove: function(req, res, next) {
    req.options.alias = "owners";
    req.options.model = "list";
    req.options.canPass = true;
    return next();
  }

};
