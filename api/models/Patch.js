_ = require('lodash');
/**
 * Patch.js
 *
 * @description :: Patch of League of Legends
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {

    version: {
      type: 'string',
      required: true
    },

    // Functions
    getShortVersion: function() {

      if (_.isString(this.version)) {

        let reqExp = new RegExp(/^\d+\.\d+/);

        let shortVersion = reqExp.exec(this.version);

        if (_.isArray(shortVersion)) {
          return shortVersion[0].replace('.', '');
        }
      }

      return this.version;

    }
  }
};
