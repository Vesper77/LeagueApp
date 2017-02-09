module.exports = {

  fill: function(req, res) {

    Patch.destroy({}).exec(function(err) {

      if (err) {
        return res.negotiate(err);

      }

      RiotApi.getVersions(function(versions) {

        let dataToInsert = [];

        if (versions) {

          let regexp = new RegExp(/^\d+\.\d+/);

          versions.forEach(function(item) {

            let shortVersion = regexp.exec(item);

            dataToInsert.push({
              version: item,
              shortVersion: shortVersion
            });

          });

        }

        if (dataToInsert.length > 0) {

          Patch.create(dataToInsert).exec(function(err) {

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


  }

};
