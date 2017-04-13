'use strict';

const url = require('url');

/**
 * @class UserController
 * @memberOf Controllers
 */
module.exports = {

  /**
   * Log in user.
   * @instance
   * @memberOf Controllers.UserController
   * @param {Object} req
   * @param {Object} res
   */
  login: function(req, res){

    if (req.method === 'POST') {

      res.login({
        successRedirect: '/admin/'
      });

    } else {

      res.ok('user/slogin');

    }
  },

  /**
   * @method
   * @name logout
   * @instance
   * @description Log out user
   * @memberOf Controllers.UserController
   * @param {Object} req
   * @param {Object} res
   */
  logout: function(req, res) {

    req.logout();

    return res.redirect('/')

  },

  /**
   * @method
   * @name signup
   * @instance
   * @description Create new user.
   * @memberOf Controllers.UserController
   * @param {Object} req
   * @param {Object} res
   */
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
