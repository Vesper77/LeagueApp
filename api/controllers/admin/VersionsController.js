const _ = require('lodash');
const RiotApi = sails.services.riotapi;

module.exports = {

  fill: function(req, res) {

    sails.models.patch.destroy({}).exec(function(err) {

      if (err) {
        return res.negotiate(err);

      }

      RiotApi.getVersions(function(versions) {

        let dataToInsert = [];

        if (versions) {

          versions.forEach(function(item) {

            let shortVersion = RiotApi.getShortVersion(item);

            if (_.isString(shortVersion)) {

              dataToInsert.push({
                version: item,
                shortVersion: shortVersion
              });

            }

          });

        }

        if (dataToInsert.length > 0) {

          sails.models.patch.create(dataToInsert).exec(function(err) {

            if (err) {
              return res.negotiate(err);

            }

            return res.redirect('/admin/');

          });

        } else {

          return res.redirect('/admin/');

        }


      });

    })
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

            sails.models.attributechanges.create(itemToInsert).exec(function(err, res) {

              if (err == null) {
                return false;
              }

            });

          });

        });

      });

      return res.redirect('/admin/');

    } else {

      return res.redirect('/admin/');

    }


  }

};
