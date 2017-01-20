var passport = require('passport')
  ,LocalStrategy = require('passport-local').Strategy;


module.exports = function(sails){

  return {

    initialize: function(cb) {

      if (!sails.hooks.orm) {
        err = new Error();
        err.code = 'E_HOOK_INITIALIZE';
        err.name = 'Passport Hook Error';
        err.message = 'The "passport" hook depends on the "orm" hook- cannot load the "passport" hook without it!';
        return cb(err);
      }

      sails.after('hook:orm:loaded', function (){

        sessionFunctions(passport);

        passport.use('local', new LocalStrategy(
          {
            usernameField: 'email',
            passwordField: 'password'
          },

          function(username, password, done) {

            console.log(username, password);

            User.findOne({ username: username }, function (err, user) {

              if (err) { return done(err); }

              return done(null, user);

            });

          }

        ));

      });

      cb();

    },

    routes: {

      before: {

        '/*': function configPassport(req, res, next) {

          passport.initialize()(req, res, function(err) {

            if (err) {
              return res.negotiate(err);
            }

            passport.session()(req, res, function(err) {

              if (err) {
                return res.negotiate(err);
              }

              next();

            });

          });
        }
      }
    }
  };
}


function sessionFunctions(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne(id, function(err, user) {
      done(err, user);
    });
  });

}
