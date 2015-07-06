/**
 * List.js
 *
 * @description :: List management
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    owners: {
      collection: 'user',
      via: 'lists'
    },
    password: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ['movie','music'],
      defaultsTo: 'movie'
    },
    entry: {
      type: 'array',
      defaultsTo: []
    }
  }
};
