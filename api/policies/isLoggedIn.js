"use strict";

/**
 * @module      :: IsLoggedIn
 * @name IsLoggedIn
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = isLoggedIn;

/**
 * Is Logged in
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function isLoggedIn(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.user) {
    return next();
  }

  // User is not allowed
  return res.redirect('/user/login/');

}
