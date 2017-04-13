module.exports = function(grunt) {
  "use strict";

  grunt.config.set('jsdoc', {
    dist : {
      src: ['./api/**/*.js','./models/**/*.js', './services/**/*.js'],
      jsdoc: './node_modules/.bin/jsdoc',
      options: {
        destination: 'doc',
        // configure: './node_modules/jsdoc/conf.json',
        template: './node_modules/ink-docstrap/template'
      }
    }
  });
}
