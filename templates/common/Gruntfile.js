var config = require('./config/config.js');

    //
    //
    //

module.exports = function(grunt) {
    'use strict';
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Project Configuration
    grunt.initConfig({

        //
        // Development
        //

        watch: {
            js: {
                files: [
                    './**/*.js', 
                    "!" + config.dir.vendor + "**", 
                    '!**/node_modules/**'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: [config.dir.styles + '/**'],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: ['**/*.spec.js'],
                tasks: ['karma:unit:run'],
                options: {
                    livereload: true
                }
            }
        },

        jshint: {
            options: {
                globals: {
                    "require"    : false,
                    "define"     : false,
                    "module"     : false,
                    "angular"    : false,
                    "describe"   : false,
                    "it"         : false,
                    "before"     : false,
                    "beforeEach" : false,
                    "after"      : false,
                    "afterEach"  : false
                }
            },
            Gruntfile: [
                'Gruntfile.js'
            ],
            public: [
                config.dir.public + '/**/*.js', 
                "!" + config.dir.vendor + '/**/*.js'
            ],
            test: [
                config.dir.test + '/**/*.js', 
                './**/*.spec.js', 
                config.dir.public + '/**/*.spec.js'
            ]
        },

        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', config.dir.vendor + '/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['config', 'public'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: config.PORT
                    },
                    cwd: "./"
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'], 
            options: {
                logConcurrentOutput: true
            }
        },

        //
        // Testing
        //

        karma: {
            unit: {
                background: true,
                options: {
                    basePath: '',
                    frameworks: ['jasmine'],
                    files: [
                        config.dir.vendor + '/**/*.js',
                        '**/*.spec.js',
                        config.dir.scripts + '/**/*.js'
                    ],
                    exclude: [
                        
                    ],
                    colors: true,
                    captureTimeout: 60000,
                    runnerPort: 9000,
                    logLevel: config.LOG_INFO,
                    browsers: ['Chrome']
                }
            }
        },

    });

    grunt.option('force', true);

    //Default task.
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['jshint', 'karma:unit:start', 'watch']);

};


