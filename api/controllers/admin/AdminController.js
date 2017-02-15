const url = require('url');
const layout = 'layouts/admin';

module.exports = {
  home: function(req, res) {

    sails.models.champion.count({}, function championCount(error, champCount) {

      if (error) {

        return res.negotiate(error);

      }

      sails.models.patch.find().exec(function(err, items) {

        if (err) {
          return res.negotiate(err);
        }

        let versCount = items.length;

        return res.ok({layout: layout, championsCount: champCount, versionsCount: versCount, versions: items}, 'admin/home');

      });

    });

  }
};