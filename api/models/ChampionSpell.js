'use strict';

module.exports = {
  attributes: {
    champion: {
      type: 'float',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    image: {
      type: 'string',
      required: true
    }
  },

  tableName: sails.config.models.tablePrefix + '_championSpell'
};
