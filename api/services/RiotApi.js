'use strict';

const request = require('request');
const _ = require('lodash');

/**
 * @class RiotApi
 * @global
 */
class RiotApi {

  /**
   * Get champions from riot api.
   *
   * @return {Promise}
   */
  getChampions() {

    return new Promise((resolve, reject) => {

      function onResponse(err, response, body) {

        if (err !== null) {
          return reject(err);
        }

        let result = JSON.parse(body);

        if (result && result['data']) {

          let champions = [];

          for(let i in result['data']) {

            if (result['data'].hasOwnProperty(i)) {

              champions.push(result['data'][i]);

            }

          }

          return resolve(champions);

        } else {

          return reject(new Error('Bad response'));

        }

      }

      let key = sails.config.local.riotApiKey;

      if (key) {

        request('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?champData=info,passive,spells,stats,image&api_key=' + key, onResponse);

      } else {

        reject(new Error('No riot api key'));

      }

    });


  }

  /**
   * Get all version from riot api.
   *
   * @return {Promise}
   */
  getVersions() {

    return new Promise((resolve, reject) => {

      let key = sails.config.local.riotApiKey;

      let onResponse = function(err, response, body) {

        if (err !== null) {
          return reject(err);
        }

        return resolve(JSON.parse(body));

      };

      if (key) {
        request('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/versions?api_key=' + key, onResponse);
      } else {
        reject(new Error('No riot api key.'));
      }

    });

  }

}

/**
 * @module
 * @global
 */
module.exports = new RiotApi();
