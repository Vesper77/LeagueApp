'use strict';

const url = require('url');
const layout = 'layouts/admin';

/**
 * @member {RepositoryStorage} RepositoryStorage
 */

/**
 * @module
 * @type {{home: module.exports.home}}
 */
module.exports = {

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
