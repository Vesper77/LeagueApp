'use strict';

/**
 * @member {RiotApi} RiotApi
 */
/**
 * @member {ApiDataHandler} ApiDataHandler
 */

/**
 * @module
 * @type {{fill: module.exports.fill}}
 */
module.exports = {

  fill: function (req, res) {

    function redir() { return res.redirect('/admin/'); }
    function error(err) {
      return res.negotiate(err);
    }

    RiotApi.getChampions(function(champions) {

      ApiDataHandler.fillChampions(champions).then(redir, error);

    });

  }

};
