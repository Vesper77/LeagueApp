const url = require('url');
/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function(req, res) {

    return res.ok({user: req.user});

  },

  login: function(req, res){

    res.login({
      successRedirect: '/user/'
    });

  },

  logout: function(req, res) {

    req.logout();

    return res.redirect('/user/');

  },

  signup: function(req, res) {

    User.create(req.params.all()).exec(

      function(err, user) {
        if (err) return res.negotiate(err);

        req.login(user, function(err) {

          if (err) return res.negotiate(err);

          return res.redirect('/user/');

        });

      }

    );

  }
};
