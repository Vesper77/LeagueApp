"use strict";

/**
 * @member {RepositoryStorage} RepositoryStorage
 */
/**
 * @type {{index: module.exports.index}}
 */
module.exports = {

  index: function(req, res) {

    let champRepo = RepositoryStorage.getChampionRepository();

    function errorCatch(err) { return res.negotiate(err); }
    function championsGet(champions) {
      return res.ok({champions: champions})
    }

    champRepo.getMany().then(championsGet, errorCatch);

  }

};

