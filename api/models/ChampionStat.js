'use strict';

/**
 * Model of champion stats
 *
 * @module
 */
module.exports = {
  attributes: {
    champion: {
      type: 'integer',
      required: true
    },
    armor: {
      type: 'float',
      required: true
    },
    armorPerLevel: {
      type: 'float',
      required: true
    },
    attackDamage: {
      type: 'float',
      required: true
    },
    attackDamagePerLevel: {
      type: 'float',
      required: true
    },
    attackRange: {
      type: 'float',
      required: true
    },
    //What is it?
    attackSpeedOffset: {
      type: 'float',
      required: true
    },
    attackSpeedPerLevel: {
      type: 'float',
      required: true
    },
    crit: {
      type: 'float',
      required: true
    },
    critPerLevel: {
      type: 'float',
      required: true
    },
    hp: {
      type: 'float',
      required: true
    },
    hpPerLevel: {
      type: 'float',
      required: true
    },
    hpRegen: {
      type: 'float',
      required: true
    },
    hpRegenPerLevel: {
      type: 'float',
      required: true
    },
    moveSpeed: {
      type: 'float',
      required: true
    },
    mp: {
      type: 'float',
      required: true
    },
    mpPerLevel: {
      type: 'float',
      required: true
    },
    mpRegen: {
      type: 'float',
      required: true
    },
    mpRegenPerLevel: {
      type: 'float',
      required: true
    },
    spellBlock: {
      type: 'float',
      required: true
    },
    spellBlockPerLevel: {
      type: 'float',
      required: true
    }
  },

  tableName: sails.config.models.tablePrefix + '_championStat'
};
