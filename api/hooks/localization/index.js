module.exports = function() {
  return {
    routes: {
      before: {
        '/*': function configLocale(req, res, next) {

          let lang = req.param('lang');

          if (lang && typeof lang === 'string') {

            lang = lang.toLowerCase();

            if (sails.config.i18n.locales.indexOf(lang) !== -1) {

              req.setLocale(lang);

              if (req.user && req.user.lang != lang) {

                User.update({_id : req.user._id}, {lang: lang});

              }

            }

          }

          next();

        }
      }
    }
  };
};
