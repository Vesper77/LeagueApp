const RiotApi = sails.services.riotapi;

module.exports = {

  index: function(req, res) {

    sails.models.champion.find().exec(

      function (err, champions) {

        if (err) {
          res.negotiate(err);
        }

        res.ok({ champions: champions});

      }

    );

  }

};

