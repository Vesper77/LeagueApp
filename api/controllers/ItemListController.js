const RiotApi = sails.services.riotapi;

module.exports = {

  index: function(req, res) {

    sails.models.items.find().exec(

      function (err, items) {

        if (err) {
          res.negotiate(err);
        }

        res.ok({ items: items});

      }

    );

  }

};


