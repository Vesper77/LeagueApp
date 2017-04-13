"use strict";

/**
 * @module ChampionController
 */
module.exports = {

  /**
   * @method
   * @name index
   * @description List of champions
   * @param {Object} req
   * @param {Object} res
   */
  index: function(req, res) {

    function championsGet(champions) {
      return res.ok({champions: champions})
    }

    /**
     * @var {RepositoryStorage} RepositoryStorage
     */
    RepositoryStorage.getChampionRepository().getMany().then(championsGet, res.serverError);

  }

};

