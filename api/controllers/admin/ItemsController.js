const RiotApi = sails.services.riotapi;
//TODO: add item stats
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

            if (obj.name != null && obj.sanitizedDescription != null) {

              dataToInsert.push({
                name: obj.name,
                riotId: obj.id,
                description: obj.sanitizedDescription,
                image: obj.image.full,
              });

            }

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
        else {
          res.redirect('/admin/');
        }
      });

    });

  }

};

