'use strict';

/**
 * ChampionSpell.js
 *
 * @description :: Spells of chapmions
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
  attributes: {
    champion: {
      model: 'champion'
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
  }
};
