module.exports = {
  attributes: {

    attribute: 'string',
    before: 'string',
    after: 'string',
    change: 'string',
    isNew: 'boolean',

    patch: {
      model: 'Patch'
    }
  },

  tableName: sails.config.models.tablePrefix + '_attributeChanges'
};
