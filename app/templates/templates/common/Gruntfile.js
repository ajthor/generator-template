var path = require('path');
var config = require('./config/config.json');
var pattern = {
    js: {
        all: './**/*.js',
        spec: './**/*.spec.js',
        public: path.join(config.dir.public, '/**/*.js'),
        vendor: path.join(config.dir.vendor, '/**/*.js'),
        scripts: path.join(config.dir.scripts, '/**/*.js'),
        test: path.join(config.dir.test, '/**/*.js')
    },
    styles: {
        all: path.join(config.dir.styles, '/**/*.css')
    },
    not: {
        vendor: "!" + path.join(config.dir.vendor, '/**/*.js')
    }
};

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
                    pattern.js.all, 
                    pattern.not.vendor,
                    '!**/node_modules/**'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: [pattern.styles.all],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: [pattern.js.spec],
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
                pattern.not.vendor,
                pattern.js.public
            ],
            test: [
                pattern.js.test, 
                pattern.js.spec
            ]
        },

        // nodemon: {
        //     dev: {
        //         options: {
        //             file: 'server.js',
        //             args: [],
        //             ignoredFiles: ['README.md', 'node_modules/**', config.dir.vendor + '/**', '.DS_Store'],
        //             watchedExtensions: ['js'],
        //             watchedFolders: [config.dir.config, config.dir.public],
        //             debug: true,
        //             delayTime: 1,
        //             env: {
        //                 PORT: config.PORT
        //             },
        //             cwd: "./"
        //         }
        //     }
        // },
        // concurrent: {
        //     tasks: ['nodemon', 'watch'], 
        //     options: {
        //         logConcurrentOutput: true
        //     }
        // },

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
                        pattern.js.vendor,
                        pattern.js.spec,
                        pattern.js.all
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
        }

    });

    grunt.option('force', true);

    //Default task.
    grunt.registerTask('default', [
        'jshint' 
        // 'concurrent'
    ]);

    //Test task.
    grunt.registerTask('test', ['jshint', 'karma:unit:start', 'watch']);

};


