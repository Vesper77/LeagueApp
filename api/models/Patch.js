const _ = require('lodash');
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

  getShortVersion: function() {

    let version = this.version;

    if (_.isString(version)) {

      let reqExp = new RegExp(/^\d+\.\d+/);

      let shortVersion = reqExp.exec(version);

      if (_.isArray(shortVersion)) {

        return shortVersion[0].replace('.', '');

      }

    }
    return version;
  },

  tableName: sails.config.models.tablePrefix + '_patch'
};
