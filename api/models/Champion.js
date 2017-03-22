'use strict';

/**
 * Champion.js
 *
 * @description :: Champions
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      name: {
          type: 'string',
          required: true,
      },
      key: {
        type: 'string',
        required: true
      },
      riotId: {
          type: 'integer',
          required: true,
          unique: true
      },
      image: {
          type: 'string',
          required: true
      }

  }
};
