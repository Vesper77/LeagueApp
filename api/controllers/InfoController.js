const RiotApi = sails.services.riotapi;

module.exports = {

  index: function(req, res) {

    sails.models.champion.find().exec(

      function (err, champions) {

        if (err) return res.send(500);

        res.ok({ champions: champions});

      }

    );

  }

};

