"use strict";

/**
 * @member {RepositoryStorage} RepositoryStorage
 */
/**
 * @type {{index: module.exports.index}}
 */

module.exports = {

  index: function(req, res) {

    function championsGet(champions) {
      return res.ok({champions: champions})
    }

    RepositoryStorage.getChampionRepository().getMany().then(championsGet, res.serverError);

  },

  data: function(req, res) {

    if (!req.param('championId')) {
      return res.notFound();
    }



  }

};

