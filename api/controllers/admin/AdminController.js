'use strict';

const url = require('url');
const layout = 'layouts/admin';

/**
 * @namespace AdminControllers
 */

/**
 * @class AdminController
 * @memberOf AdminControllers
 */
module.exports = {

  /**
   * @method
   * @instance
   * @memberOf AdminControllers.AdminController
   * @name home
   * @description Home Action
   * @param {Object} req
   * @param {Object} res
   */
  home: function(req, res) {

    let champRepo = RepositoryStorage.getChampionRepository();
    let patchRepo = RepositoryStorage.getPatchRepository();

    let championsCount = 0;

    function errorCatch(err) { return res.negotiate(err); }
    function champsCount(count) {

      championsCount = count;

      return patchRepo.getMany();

    }
    function getPatches(patches) {

      let patchesCount = patches.length;

      return res.ok({layout: layout, championsCount: championsCount, versionsCount: patchesCount, versions: patches}, 'admin/home');

    }

    return champRepo.count().then(champsCount, errorCatch).then(getPatches, errorCatch);

  }

};
