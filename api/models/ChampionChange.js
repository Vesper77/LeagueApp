'use strict';

/**
 * ChampionChange.js
 *
 * @description :: Changes of champion
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    patch: {
      model: 'patch'
    },

    champion: {
      model: 'champion'
    },

    attribute: 'string',
    before: 'string',
    after: 'string',
    change: 'string',
    isNew: 'boolean',


  },
};
