const url = require('url');
/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function(req, res) {

    if (req.user) {

      Champion.count({}, function championCount(error, champCount) {

        if (error) {

          return res.negotiate(error);

        }

        Patch.count({}, function patchCount(err, versCount) {

          if (err) {
            return res.negotiate(err);
          }

          return res.ok({layout: 'layouts/admin', championsCount: champCount, versionsCount: versCount}, 'admin/home');

        });

      });

    } else {

      return res.ok({layout: 'layouts/admin'}, 'admin/login');

    }

  },

  login: function(req, res){

    res.login({
      successRedirect: '/admin/'
    });

  },

  logout: function(req, res) {

    req.logout();

    return res.redirect('/')

  },

};
