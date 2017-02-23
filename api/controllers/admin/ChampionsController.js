'use strict';

/**
 * @member {RiotApi} RiotApi
 */
/**
 * @member {RepositoryStorage} RepositoryStorage
 */

/**
 * @module
 * @type {{fill: module.exports.fill}}
 */
module.exports = {

  fill: function (req, res) {

    let championRepo = RepositoryStorage.getChampionRepository();

    championRepo.remove(function(err) {

      if (err) {
        return res.negotiate(err);
      }

      RiotApi.getChampions(function(champions) {

        let dataToInsert = [];

        if (champions) {

          champions.forEach(function(item) {

            dataToInsert.push({
              name: item.name,
              riotId: item.id,
              image: item.image.full
            });

          });

          if (dataToInsert.length > 0) {

            championRepo.put(dataToInsert, function(err) {

              if (err) {
                return res.negotiate(err);
              }

              res.redirect('/admin/');

            });

          } else {

            res.redirect('/admin/');

          }

        }

      });

    });

  }

};
