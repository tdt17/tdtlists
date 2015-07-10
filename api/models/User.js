/**
 * User.js
 *
 * @description :: Manages users
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// Credit:
// @adityamukho https://gist.github.com/adityamukho/6260759

var bcrypt = require('bcryptjs');

function hashPassword(values, next) {
  bcrypt.hash(values.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    values.password = hash;
    next();
  });
}

function removeUnchangeableAttributes(values) {
  delete values.id;
}

module.exports = {
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      protected: true,
      minLength: 6
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    lists: {
      collection: 'list',
      via: 'owners'
    },
    validPassword: function (password, callback) {
      var obj = this.toObject();
      if (callback) {
        //callback (err, res)
        return bcrypt.compare(password, obj.password, callback);
      }
      return bcrypt.compareSync(password, obj.password);
    }
  },
  // Lifecycle Callbacks
  beforeCreate: function (values, next) {
    removeUnchangeableAttributes(values);

    hashPassword(values, next);
  },
  beforeUpdate: function (values, next) {
    removeUnchangeableAttributes(values);

    if (values.password) {
      hashPassword(values, next);
    } else {
      next();
    }
  }
};
