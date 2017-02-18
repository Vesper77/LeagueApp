/**
 * @module Items
 *
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
    },
    id: {
      type: 'int',
      required: true
    },
    image: {
      type: 'string',
      required: true
    },
    cost: {
      type: 'double',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    stats: {
      type: 'string',
      required: true
    },

  },
  tableName: sails.config.models.tablePrefix + '_item'
};

