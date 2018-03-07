'use strict';

module.exports = function(grunt) {

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          './{,*/}*.js',
         '!./node_modules/{,*/}*.js'
        ]
      }
    }
  });
  
  // Default task(s).
  grunt.registerTask('default', ['jshint']);


};