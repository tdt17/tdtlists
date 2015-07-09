/**
 * List.js
 *
 * @description :: List management
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

function findIndexforEntryId(entryId, array){
  for(var i in array){
    if(array[i].id == entryId){
      return i;
    }
  }
  return -1;
}

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
    },
    entryCounter: {
      type: 'integer',
      defaultsTo: 0,
      protected: true
    },

    addEntry: function(data) {
      data.id = ++this.entryCounter;
      this.entry.push(data);
    },

    updateEntry: function(data) {
      try{
        if(data.id < 0 || data.id > this.entryCounter) {
          throw "Invalid data id ("+data.id+")";
        }
        this.entry[findIndexforEntryId(data.id)] = data;
      }catch(e){
        sails.log.warn("updateEntry failed: " + e);
        throw "Could not update data";
      }
    },

    removeEntry: function(data) {
      try{
        if(data.id < 0 || data.id > this.entryCounter) {
          throw "Invalid data id ("+data.id+")";
        }
        return this.entry.splice(findIndexforEntryId(data.id),1);
      }catch(e){
        sails.log.warn("updateEntry failed: " + e);
        throw "Could not update data";
      }
    }
  },
  //Add User as Owner
  afterCreate: function(newlyInsertedRecord, cb) {
    List.findOne(newlyInsertedRecord.id).exec(function(err, list){
      list.owners.add(sails.session.user.id);
      list.save(function(err,res) {
        if (err) {
          cb(err);
        }
        cb();
      });
    });
  }
};

