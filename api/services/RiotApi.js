"use strict";
let request = require('request');

module.exports = {

  getVersions: function(callback) {

    if (typeof callback != 'function') {
      return false;
    }

    function onResponse(error, response, body) {

      if (error !== null) {

        callback(null);
        return true;

      }

      callback(JSON.parse(body));
      return true;

    }

    request('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/versions?api_key=' + Keys.riotApiKey, onResponse);

  },
  getChampions: function(callback) {

    if (typeof callback != 'function') {

      return false;

    }

    function onResponse(err, response, body) {

      if (err !== null) {

        callback(null);
        return true;

      }

      let result = JSON.parse(body);

      if (result && result['data']) {

        let champions = [];

        for(let i in result['data']) {

          if (result['data'].hasOwnProperty(i)) {

            champions.push(result['data'][i]);

          }

        }

        callback(champions);

      } else {

        callback(null);

      }

    }

    request('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?champData=image&api_key=' + Keys.riotApiKey, onResponse);

  }

};
