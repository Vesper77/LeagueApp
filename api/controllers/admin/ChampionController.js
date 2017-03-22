'use strict';

const layout = 'layouts/admin';

/**
 * @member {RiotApi} RiotApi
 */
/**
 * @member {ApiDataHandler} ApiDataHandler
 */

/**
 * @member {RepositoryStorage} RepositoryStorage
 */

/**
 * @module
 * @type {{fill: module.exports.fill}}
 */
module.exports = {

  index: function(req, res) {

    let resolve = function(champions) {
      return res.ok({'layout': layout, champions: champions});
    };
    let error = function(err) {
      return res.negotiate(err);
    };

    RepositoryStorage.getChampionRepository().getMany().then(resolve, error);
  },

  fill: function (req, res) {

    function redir() { return res.redirect('/admin/'); }
    function error(err) {
      return res.negotiate(err);
    }

    RiotApi.getChampions().then(ApiDataHandler.fillChampions, error).then(redir, error);

  }

};
