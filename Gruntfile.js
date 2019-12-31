/*global module:false*/
module.exports = function(grunt) {

  const sass = require('node-sass');

  // load timer first, explicitly
  require('time-grunt')(grunt);

  // check and load only tasks we need using jit-grunt
  require('jit-grunt')(grunt, {
    sasslint: 'grunt-sass-lint'
  });

  grunt.initConfig({
    sass: {
      build: {
        options: {
          implementation: sass
        },
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
            src: ['**/*.hdbs', '!**/partials/**'],
            dest: 'build/',
            ext: ".html"
          }
        ],
        partials: 'templates/partials/*',
        helpers: 'templates/helpers/*'
      }
    },
    clean: {
      build: ['build/**/*']
    },
    concurrent: {
      prepare: ['clean:build', 'sasslint'],
      build: ['copy:favicons', 'sass:build', 'compile-handlebars']
    },
    copy: {
      favicons: {
        expand: true,
        cwd: 'images/favicons/',
        src: ['*'],
        dest: 'build/'
      }
    },
    watch: {
      templates: {
        files: ['templates/**/*.hdbs'],
        tasks: ['compile-handlebars']
      },
      css: {
        files: ['css/**/*.scss'],
        tasks: ['sasslint', 'sass']
      },
      favicons: {
        files: ['images/favicons/*'],
        tasks: ['copy:favicons']
      }
    }
  });

  grunt.registerTask('build', ['concurrent:prepare', 'concurrent:build']);

  /* When watch is fired, first check to see if it's templates, css, etc. then
     only perform those related tasks */
  grunt.event.on('watch', function(action, filepath) {
    if (filepath.includes("templates/")) {
      grunt.config('compile-handlebars.all.files.cwd', filepath);
    } else if (filepath.includes("css/")) {
      grunt.config('sasslint.target', filepath);
      grunt.config('sass.build.files.src', filepath);
    } else if (filepath.includes("images/favicons/")) {

    }
  });
};
