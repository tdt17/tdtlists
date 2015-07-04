/**
 * Install bower components.
 *
 * ---------------------------------------------------------------
 *
 * Installs bower components and copies the required files into the assets folder structure.
 *
 */

module.exports = function(grunt) {

	grunt.config.set('bower', {
    dev: {
      dest: 'assets/vendor/',
      options: {
        expand: true,
        packageSpecific: {
          'bootstrap': {
            files: [
              'dist/css/bootstrap.css',
              'dist/css/bootstrap.css.map',
              'dist/css/bootstrap-theme.css',
              'dist/css/bootstrap-theme.css.map',
              'dist/js/bootstrap.js',
              'dist/fonts/**'
            ]
          }
        }
      }
    }
	});

  grunt.loadNpmTasks('grunt-bower');
};
