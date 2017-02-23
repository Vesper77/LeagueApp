/**
 * AttributeChange.js
 *
 * @type {{attributes: {attribute: string, before: string, after: string, change: string, isNew: string, patch: {model: string}}, tableName: string}}
 */
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

  tableName: sails.config.models.tablePrefix + '_attributeChange'
};
