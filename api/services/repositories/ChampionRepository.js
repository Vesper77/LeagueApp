'use strict';

const BaseRepository = require('./base/BaseRepository');
const _ = require('lodash');

/**
 * @class ChampionRepository
 * @extends BaseRepository
 */
function ChampionRepository() {}
ChampionRepository.prototype = new BaseRepository('champion');

/**
 * Get champions riot ids by names
 * @param {Array} championKeys
 * @result {Promise}
 */
ChampionRepository.prototype.getChampionsByKey = function(championKeys) {

  if (championKeys && _.isArray(championKeys)) {

    return this.getMany({
      'key': championKeys
    });

  } else {

    return new Promise((resolve, reject) => {return reject(new Error('Bad data'));})

  }

};

/**
 * Fill champions by riot ids.
 * @param {Array} items
 * @param {String} riotIdKey
 * @param {String} fieldKey
 * @return {Promise}
 */
ChampionRepository.prototype.fillChampionByRiotIds = function(items, riotIdKey, fieldKey) {

  return new Promise((resolve, reject) => {

    if (items && _.isArray(items)) {

      riotIdKey = riotIdKey || 'riotId';
      fieldKey = fieldKey || 'champion';

      let championsIds = [];

      items.forEach(function(item) {

        if (item[riotIdKey]) {
          championsIds.push(item[riotIdKey]);
        }

      });

      if (championsIds.length) {

        let championsFill = function(champions) {

          items.forEach(function(item) {

            if (item[riotIdKey]) {

              let champion = champions.find((ele) => { return ele.riotId === item[riotIdKey]; });

              if (champion) {
                item[fieldKey] = champion;
              }
            }
          });

          return resolve(items);
        };

        let error = function(err) {
          return reject(err);
        };

        return this.getMany({'riotId': {$in: championsIds}}).then(championsFill, error);
      } else {

        return resolve(items);
      }

    }

  });

};

module.exports = ChampionRepository;
