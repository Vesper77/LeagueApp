const RiotApi = sails.services.riotapi;

module.exports = {

  fill: function (req, res) {

    sails.models.champion.destroy({}).exec(function(err) {

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

            sails.models.champion.create(dataToInsert).exec(function(err) {

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
