let sails = require('sails');

/**
 * @module Champion
 * @type {{attributes: {name: {type: string, required: boolean}, riotId: {type: string, required: boolean}}}}
 */

module.exports = {
  attributes: {
      name: {
          type: 'string',
          required: true
      },
      riotId: {
          type: 'int',
          required: true
      },

  },
  tableName: sails.config.models.tablePrefix + '_champion'
};
