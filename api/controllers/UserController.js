const url = require('url');
/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  login: function(req, res){

    if (req.method === 'POST') {

      res.login({
        successRedirect: '/admin/'
      });

    } else {

      res.ok('user/login');

    }
  },

  logout: function(req, res) {

    req.logout();

    return res.redirect('/')

  },

  signup: function(req, res) {

    if (req.method === 'POST') {

      sails.models.user.create(req.params.all()).exec( function(err, user) {

        res.redirect('/user/login/');

      });

    } else {

      res.ok('user/register');

    }

  }
};
