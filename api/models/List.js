/**
 * List.js
 *
 * @description :: List management
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

function findIndexforEntryId(entryId, array) {
  for (var i in array) {
    if (array[i].id == entryId) {
      return i;
    }
  }
  return -1;
}

function removeUnchangeableAttributes(values) {
  delete values.id;
  delete values.owners;
}

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    owners: {
      collection: 'user',
      via: 'lists',
      required: true
    },
    password: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ['movie', 'music'],
      defaultsTo: 'movie'
    },
    entry: {
      type: 'array',
      defaultsTo: []
    },
    entryCounter: {
      type: 'integer',
      defaultsTo: 0,
      protected: true
    },

    addEntry: function (data) {
      data.id = this.entryCounter++;
      this.entry.push(data);
      return data;
    },

    updateEntry: function (data) {
      try {
        if (data.id < 0 || data.id > this.entryCounter) {
          throw "Invalid data id (" + data.id + ")";
        }
        var index = findIndexforEntryId(data.id, this.entry);
        var oldData = this.entry[index];
        this.entry[index] = data;
        return oldData;
      } catch (e) {
        sails.log.warn("updateEntry failed: " + e);
        throw "Could not update data";
      }
    },

    removeEntry: function (data) {
      try {
        if (data.id < 0 || data.id > this.entryCounter) {
          throw "Invalid data id (" + data.id + ")";
        }
        return this.entry.splice(findIndexforEntryId(data.id, this.entry), 1);
      } catch (e) {
        sails.log.warn("updateEntry failed: " + e);
        throw "Could not update data";
      }
    }
  }
};

