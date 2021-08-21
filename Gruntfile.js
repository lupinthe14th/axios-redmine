'use strict()'

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt)

  const options = {
    config: {
      src: './grunt/*.js'
    },
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      serve: {
        script: 'index.js',
        options: {
          ignore: ['node_modules/**']
        }
      }
    }
  }

  const configs = require('load-grunt-configs')(grunt, options)

  // Project configuration.
  grunt.initConfig(configs)

  grunt.registerTask('lint', ['eslint'])

  grunt.registerTask('test', ['mochacli'])

  grunt.registerTask('coverage', ['mocha_istanbul:coverage'])

  // default option to connect server
  grunt.registerTask('serve', ['eslint', 'mochacli', 'mocha_istanbul'])
}
