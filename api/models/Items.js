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
    riotId: {
      type: 'int',
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

  }
};

