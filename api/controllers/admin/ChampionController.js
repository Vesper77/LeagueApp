'use strict';
/**
 *  @var {ApiDataHandler} ApiDataHandler
 */
/**
 * @var {RiotApi} RiotApi
 */
/**
 * @var {RepositoryStorage} RepositoryStorage
 */

/**
 * @module Admin Champion Controller
 */

const layout = 'layouts/admin';

module.exports = {

  /**
   * Get champion list.
   *
   * @param {Object} req
   * @param {Object} res
   */
  index: function(req, res) {

    let resolve = function(champions) {
      return res.ok({layout: layout, champions: champions, view: 'admin/champion/index'});
    };

    RepositoryStorage.getChampionRepository().getMany().then(resolve, res.serverError);
  },

  /**
   * Fill champions to database.
   *
   * @param {Object} req
   * @param {Object} res
   */
  fill: function (req, res) {

    function redir() { return res.redirect('/admin/'); }

    RiotApi.getChampions().then(ApiDataHandler.fillChampions, res.serverError).then(redir, res.serverError);
  }

};
