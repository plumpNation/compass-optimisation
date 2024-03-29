'use strict';

module.exports = function (grunt) {
    var srcDir = './src/',

        // The main grunt config
        gruntConfig = {

            // https://github.com/gruntjs/grunt-contrib-watch
            watch: {
                // A small watcher to compile sass while you work.
                css: {
                    files: srcDir + 'scss/**/*.scss',
                    tasks: 'compass'
                }
            },

            scsslint: {
                options: {
                    config: 'scss-lint.yml',
                    bundleExec: true,
                    colorizeOutput: true
                    // reporterOutput: './scss-lint.xml',
                },

                src: [
                    srcDir + 'scss/**/*.scss',
                ]
            },

            // Autoprefixer parses CSS and adds vendor-prefixed CSS properties
            // using the 'Can I Use' database.
            // https://github.com/nDmitry/grunt-autoprefixer
            autoprefixer: {
                options: {
                    browsers: ['last 2 versions']
                },

                // autoprefixed css only exists in the build directory at the moment.
                build: {
                    src: srcDir + '**/*.css'
                }
            },

            // Compiles your .scss files into the css folder in your module src folder
            compass: {
                build: {
                    options: {
                        bundleExec: true,
                        config: 'config.rb',
                        sassDir: srcDir + 'scss',
                        cssDir: srcDir + 'css',

                        // https://gist.github.com/passy/5270050
                        // Reading materials...
                        imagesDir: srcDir + 'images'
                    }
                }
            }
        };

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig(gruntConfig);

    grunt.registerTask('lint', ['scsslint']);

    grunt.registerTask('build', ['compass']);

    grunt.registerTask('default', ['lint', 'build', 'autoprefixer']);
};
