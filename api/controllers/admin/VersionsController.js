'use strict';

/**
 * @member {ApiDataHandler} ApiDataHandler
 */
/**
 * @member {RiotApi} RiotApi
 */

/**
 * @module
 * @type {{fill: module.exports.fill, parsePatch: module.exports.parsePatch}}
 */
module.exports = {

  fill: function(req, res) {

    RiotApi.getVersions(function(versions) {

      function error() { return res.negotiate(err); }

      function redir() { return res.redirect('/admin/') }

      ApiDataHandler.fillVersions(versions).then(redir, error);

    });

  },

  parsePatch: function(req, res) {

    let version = req.param('version');
    //
    // if (version) {
    //
    //   RiotApi.getPatchChanges(version, function(result) {
    //
    //     ApiDataHandler.insertAttributeChanges(result).then()
    //
    //       if (err) {
    //         res.negotiate(err);
    //       }
    //
    //       return res.redirect('/admin/');
    //
    //     });
    //
    //   });
    //
    // } else {
    //
    //   return res.redirect('/admin/');
    //
    // }


  }

};
