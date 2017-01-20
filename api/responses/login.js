let passport = require('passport');

/**
 * res.login()
 *
 * @description :: Log the requesting user in using a passport strategy
 */

module.exports = function login(opts) {

  // Get access to `req` and `res`
  let req = this.req;
  let res = this.res;

  opts = _.extend({
    successRedirect: '/',
    usernameField: 'username',
    passwordField: 'password'
  }, opts || {});

  function afterVertify(err, user) {

    if (err) return res.negotiate(err);
    if (!user) return res.badRequest('No user there');

    return req.login(user, function(err) {
      if (err) return res.negotiate(err);
      return res.redirect(opts.successRedirect);
    });

  }

  passport.authenticate('local', afterVertify)(req, res);
};
