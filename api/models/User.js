/**
 * User.js
 *
 * @description :: Users
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
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
    firstname: {
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
  }
};

