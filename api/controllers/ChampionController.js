"use strict";

/**
 * @member {RepositoryStorage} RepositoryStorage
 */
/**
 * @type {{index: module.exports.index}}
 */
module.exports = {

  index: function(req, res) {

    const champRepo = RepositoryStorage.getChampionRepository();

    champRepo.getMany(function next(err, champions) {

      if (err) {
        res.negotiate(err);
      }

      res.ok({ champions: champions});

    });

  }

};

