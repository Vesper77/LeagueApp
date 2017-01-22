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

      Champion.count({}, function championCount(error, count) {

        if (error) {

          return res.negotiate(error);

        }

        return res.ok({layout: 'layouts/admin', championsCount: count}, 'admin/home');

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
