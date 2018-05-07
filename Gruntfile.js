/*global module:false*/
module.exports = function(grunt) {

  // load timer first, explicitly
  require('time-grunt')(grunt);

  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      build: {
        files: [
          { expand: true,
            cwd: 'css/',
            src: 'main.scss',
            dest: 'build/css/',
            ext: '.css'
          }
        ]
      },
    },
    sasslint: {
      target: ['assets/css/*.scss']
    },
    'compile-handlebars': {
      all: {
        files: [
          { expand: true,
            cwd: 'templates/',
            src: '*.hdbs',
            dest: 'build/',
            ext: ".html"
          }
        ],
        partials: 'templates/partials/*'
      }
    },
    clean: {
      build: ['build/**/*']
    },
    concurrent: {
      prepare: ['clean:build', 'sasslint'],
      build: ['sass:build', 'compile-handlebars']
    }
  });

  grunt.registerTask('build', ['concurrent:prepare', 'concurrent:build']);

};
