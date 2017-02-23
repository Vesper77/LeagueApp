'use strict';

const url = require('url');

/**
 * @member {RepositoryStorage} RepositoryStorage
 */
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

      let userRepo = RepositoryStorage.getUserRepository();

      userRepo.put(req.params.all(), function(err, user) {

        if (err) {
          return res.negotiate(err);
        }

        res.redirect('/user/login/');

      });

    } else {

      res.ok('user/register');

    }

  }
};
