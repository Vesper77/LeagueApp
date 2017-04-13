'use strict';

const layout = 'layouts/admin';
const _ = require('lodash');

/**
 * @var {RepositoryStorage} RepositoryStorage
 */
/**
 * @var {RiotApi} RiotApi
 */
/**
 * @var {ApiDataHandler} ApiDataHandler
 */

/**
 * @module
 */
module.exports = {

  index: function(req, res) {

    let getVersion = function(versions) { return res.ok({layout: layout, versions: versions}, 'admin/patch/index'); };

    return RepositoryStorage.getPatchRepository().getLastVersion().then(getVersion, res.serverError)

  },

  data: function(req, res) {

    if (!req.param('patchId')) {
      return res.notFound();
    }

    let getChanges = function(patch) {
      return new Promise((resolve, reject) => {
        RepositoryStorage.getChampionChangeRepository().getMany({patch: patch.id}, 'champion').then(resolve, reject);
      });
    };

    let displayView = function(changes) {
      return res.ok({layout: layout, changes: changes}, 'admin/patch/version');
    };

    RepositoryStorage.getPatchRepository().getOne(req.param('patchId')).then(getChanges, res.serverError).then(displayView, res.serverError);

  },

  fillVersions: function(req, res) {

    function error(err) { return res.negotiate(err); }

    function redir() { return res.redirect('/admin/') }

    RiotApi.getVersions().then(ApiDataHandler.fillVersions, error).then(redir, error);

  },

  parse: function(req, res) {

    if (!req.param('patchId')) {
      return res.notFound();
    }

    let error = function (err) {
      return res.negotiate(err);
    };

    let attributesPerform = function(attributes, patch) {

      let championRepo = RepositoryStorage.getChampionRepository();
      let championChangesRepo = RepositoryStorage.getChampionChangeRepository();

      let championKeys = [];
      let dataToInsert = [];

      if (attributes && _.isArray(attributes)) {

        let setChampionId = function(champions) {

          attributes.forEach(function(attribute) {

            champions.forEach(function(champion) {

              if (attribute.championKey.toLowerCase() === champion.key.toLowerCase()) {

                attribute.attributesChanges.forEach(function(change) {

                  change.champion = champion;
                  change.patch = patch;

                });

              }

            });

          });

        };

        let insertData = function() {

          attributes.forEach(function(heroChange) {

            heroChange.attributesChanges.forEach(function(change) {

              if (change.champion) {

                dataToInsert.push(change);

              }

            });

          });

          championChangesRepo.put(dataToInsert).then(() => { return res.redirect('/admin/'); } ,error);

        };

        attributes.forEach(function (item) {
          championKeys.push(new RegExp('^' + item.championKey + '$', 'i'));
        });

        championRepo.getChampionsByKey(championKeys).then(setChampionId, error).then(insertData, error);

      }

    };

    let processPatch = function (patch) {

      if (!patch) {
        return res.notFound();
      }

      let shortVersion = patch.getShortVersion();

      if (shortVersion) {

        let parser = new PatchParser(shortVersion);

        parser.processHtml().then((attributes) => { return attributesPerform(attributes, patch); }, error);

      } else {

        return res.redirect('/admin/');

      }

    };

    RepositoryStorage.getPatchRepository().getOne({id: req.param('patchId')}).then(processPatch, error);

  }

};
