'use strict';

const _ = require('lodash');

/**
 * @member {RepositoryStorage} RepositoryStorage
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

    const patchRepo = RepositoryStorage.getPatchRepository();

    patchRepo.remove(function(err) {

      if (err) {
        return res.negotiate(err);
      }

      RiotApi.getVersions(function(versions) {

        let dataToInsert = [];

        versions.forEach(function(item) {

          let shortVersion = RiotApi.getShortVersion(item);

          if (_.isString(shortVersion)) {

            dataToInsert.push({
              version: item,
              shortVersion: shortVersion
            });

          }

        });

        if (dataToInsert.length > 0) {

          patchRepo.put(dataToInsert, function(err) {

            if (err) { return res.negotiate(err); }

            return res.redirect('/admin/');

          });

        } else {

          return res.redirect('/admin/');

        }

      });

    });

  },
  parsePatch: function(req, res) {

    let version = req.param('version');

    if (version) {

      RiotApi.getPatchChanges(version, function(result) {

        result.forEach(function (hero) {

          hero.attributesChanges.forEach(function(attributeChange) {

            let itemToInsert = {
              attribute: attributeChange.attribute,
              isNew: attributeChange.isNew,
              change: attributeChange.attributeChange,
              before: attributeChange.attributeBefore,
              after: attributeChange.attributeAfter
            };

            let attrbuteRepo = RepositoryStorage.getAttributeChangesRepository();
            attrbuteRepo.put(itemToInsert, function(err, res) {

              if (err) { res.negotiate(err); }

              return res.redirect('/admin/');

            });

          });

        });

      });


    } else {

      return res.redirect('/admin/');

    }


  }

};
