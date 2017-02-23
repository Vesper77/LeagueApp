/**
 * Patch.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    version: {
      type: 'string',
      required: true
    },
    shortVersion: {
      type: 'string',
      required: true
    }
  },

  tableName: sails.config.models.tablePrefix + '_patch'
};
