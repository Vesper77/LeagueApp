const RiotApi = sails.services.riotapi;

module.exports = {

  fill: function (req, res) {

    sails.models.items.destroy({}).exec(function(err) {

      if (err) {
        return res.negotiate(err);
      }

      RiotApi.getItems(function(items) {

        let dataToInsert = [];

        if (items) {

          items.forEach(function(obj) {

            dataToInsert.push({
              name: obj.name,
              riotId: obj.id,
              image: obj.image,
              cost: obj.gold,
              description: obj.sanitizedDescription,
              stats: obj.stats,
            });

          });

          if (dataToInsert.length > 0) {

            sails.models.items.create(dataToInsert).exec(function(err) {

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

