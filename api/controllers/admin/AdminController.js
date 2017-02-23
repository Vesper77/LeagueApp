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

    const champRepo = RepositoryStorage.getChampionRepository();
    const patchRepo = RepositoryStorage.getPatchRepository();

    champRepo.count(function championCount(error, champCount) {

      if (error) { return res.negotiate(error); }

      patchRepo.getMany(function(err, items) {

        if (err) { return res.negotiate(err); }

        let versCount = items.length;

        return res.ok({layout: layout, championsCount: champCount, versionsCount: versCount, versions: items}, 'admin/home');

      });

    });

  }

};
