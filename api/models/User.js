/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @global
 */

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 32
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    frstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    leagueAccount: {
      type: 'string'
    },
    lang: {
      type: 'string',
      defaultsTo: 'en',
      enum: ['ru', 'en']
    }
  },

  tableName: sails.config.models.tablePrefix + '_user'
};

