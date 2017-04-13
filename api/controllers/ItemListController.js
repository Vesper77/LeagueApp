"use strict";

/**
 * Controllers
 * @namespace Controllers
 */

module.exports = new ItemListController();

/**
 * @class ItemListController
 * @constructor
 * @memberOf Controllers
 */
function ItemListController() {

  /**
   * Show list of items.
   * @param {Object} req
   * @param {Object} res
   */
  this.index = function(req, res) {

    sails.models.items.find().exec(

      function (err, items) {

        if (err) {
          res.negotiate(err);
        }

        res.ok({ items: items});

      }

    );

  }
}


