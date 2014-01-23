/*
 * zsitro/Dopamine
 * https://github.com/zsitro/Dopamine
 *
 * Copyright (c) 2013 Gabor Zsoter
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // configure the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            build: {
                cwd: 'source',
                src: ['**', '!**/*.{styl,jade,sass,scss}'],
                dest: 'build',
                expand: true
            },
            images: {
                cwd: 'source/app/images',
                src: ['**/*.{jpg,png,gif,ico}'],
                dest: 'build/app/images',
                expand: true
            },
            scripts: {
                cwd: 'source/app/scripts',
                src: ['**/*.js'],
                dest: 'build/app/scripts',
                expand: true
            },
            dist: {
                cwd: 'build',
                src: ['**'],
                dest: 'dist',
                expand: true
            } 
        },

        clean: {
            init: {
                src: ['build/**/*']
            },
            dist: {
                src: ['dist/**/*.*']
            },
            // dist: {
            //  src: ['dist']
            // },
            stylesheets: {
              src: [ 'build/app/sass', 'build/app/stylus' ]
            },
            markup: {
              src: [ 'build/app/views', 'build/app/views' ]
            },            
            scripts: {
              src: [ 'build/app/scripts___' ]
            },
            htmlRemoveAll: {
              src: [ 'dist/**/*.html' ]
            },
        },

        sass: {
            dev :{
                files: {
                    'build/app/css/main.css': 'source/app/sass/main.scss'
                }    
            }
            
        },

        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true,
                    data: {
                        dp: {
                            settings: {
                                supports: {
                                    ie: true
                                }
                            },
                            page: {},
                            project: {
                                name: "PROJECTNAME" // TODO: Move to external settings file
                            }
                        }

                    }
                },
                files: [{
                    cwd: "source/app/views",
                    src: ["**/*.jade", '!**/_*.jade', '!**/dp-*.jade'],
                    dest: "",
                    expand: true,
                    ext: ".html"
                }]
            }
        },

        prettify: {
            options: {
                indent: 1,
                indent_char: '  ',
                wrap_line_length: 0,
                preserve_newlines: true,
                padcomments: true,
                brace_style: 'expand',
                max_preserve_newlines: 2,
                unformatted: ['pre']
            },
            // Prettify a directory of files
            all: {
                expand: true,
                cwd: '',
                ext: '.html',
                src: ['*.html'],
                dest: ''
            }
        },

        autoprefixer: {
            browsers: ['last 2 version', 'ie 8'],
            build: {
                expand: true,
                cwd: 'build/app/css',
                src: [ '**/*.css' ],
                dest: 'build/app/css'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dist/app/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/app/images/'
                }]
            }
        },

        cssmin: {
         build: {
            options: {
                banner: ''
            },
             files: {
                 'build/app/css/main.css': [ 'build/app/css/main.css' ]
             }
         }
        },

        //coffee: {
        //  build: {
        //      expand: true,
        //      cwd: 'source',
        //      src: [ '**/*.coffee' ],
        //      dest: 'build',
        //      ext: '.js'
        //  }
        //},

        requirejs: {
            // options: {
            //  'appDir': 'temp',
            //  'dir': 'dist',
            //  'mainConfigFile': 'temp/app/scripts/app.js',
            //  'optimize': 'uglify2',
            //  'normalizeDirDefines': 'skip',
            //  'skipDirOptimize': true,
            // },
            compile: {
                options: {
                    name: 'app',
                    baseUrl: "dist/app/scripts",
                    optimize: 'uglify2',
                    mangle: false,
                    mainConfigFile: "dist/app/scripts/app.js",
                    out: "dist/app/scripts/app.min.js",
                    preserveLicenseComments: true,

                }
            },
            // shared: {
            //  options: {
            //      'modules': [{
            //          'name': 'app',
            //          'include': [
            //              'jquery',
            //              //'consoleShim',
            //              //'externalLinks'
            //          ],
            //      },
            //      {
            //          'name': 'pages/contact/main',
            //          'exclude': ['app']
            //      },
            //      ],
            //  }
            // },

        },

        compress: {
            main: {
                options: {
                    archive: 'PROJECTNAME.sitebuild-'+'<%= grunt.template.today("dddd-mmmm-dS.yyyy.h.TT") %>'+'.zip'
                },
                files:[{
                    expand: true,
                    src: [
                        '**/*',
                        '!*.zip',
                        '!node_modules/**', 
                        '!vendor/bootstrap/**',
                        'vendor/bootstrap/dist/css/bootstrap.min.css',
                        ],
                    dest: ''    
                }]
            },
            // bootstrap: {
            //     options: {
            //         archive: 'PROJECTNAME.bootstrap.source-'+'<%= grunt.template.today("dddd-mmmm-dS.yyyy.h.TT") %>'+'.zip'
            //     },
            //     files:[{
            //         expand: true,
            //         src: [
            //             'vendor/bootstrap/**/*.*',
            //             ],
            //         dest: ''                
            //     }]
            // },
        },

        watch: {

            images: {
                files: 'source/app/images/**/*.{jpg,png,gif}',
                tasks: ['copy:images'],
                options: {
                    livereload: true
                }
            },

            sass: {
                files: ['source/app/sass/**/*.{scss,sass}'],
                tasks: ['stylesheets'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: 'source/**/*.js',
                tasks: [
                    //'copy:build'
                    'scripts'
                ],
                options: {
                    livereload: true
                }
            },
            jade: {
                files: 'source/app/views/**',
                tasks: [ 'markup' ],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 4000,
                    base: '',
                    hostname: '*'
                }
            }
        },

    });



    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    //grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-sass');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.', [
        //'stylus'
        'sass:dev',
        'autoprefixer',
        'clean:stylesheets'
        ]
    );

    grunt.registerTask(
        'markup',
        'Compiles jade.', [
            'jade',
            'prettify',
            'clean:markup'
        ]
    );

    grunt.registerTask(

      'scripts',
      'Compiles the JavaScript files.',
      [
        'copy:scripts',
        //'coffee',
        //'uglify', 
        //was ok 'uglify:js',
        //'clean:scripts'
        ]
      );

    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.', [
        'clean:init',
        'copy:build',
        'copy:images',
        'stylesheets',
        'markup',
        'scripts']
    );

    grunt.registerTask(
        'default',
        'Watches the project for changes, automatically builds them and runs a server.', [
        'build', 
        'connect',
        'watch'
        ]
    );


    grunt.registerTask(
        'release',
        'Makes a  production-ready release of the current content', [
        'clean:dist',
        'build',
        'cssmin',
        'copy:dist',
        //'sprites',
        //'imagemin',
        'requirejs',
        //'clean:temp',
        //'clean:htmlRemoveAll'
        ]
    );


};