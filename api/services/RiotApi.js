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

      callback(JSON.parse(body));
      return true;

    }

    request('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=' + Keys.riotApiKey, onResponse);

  }

};
