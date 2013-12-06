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

        copy: {
            build: {
                cwd: 'source',
                src: ['**', '!**/*.styl', '!**/*.jade', '!**/*.jade'],
                dest: 'build',
                expand: true
            }
        },

        clean: {
            build: {
                src: ['build']
            } //,
            //stylesheets: {
            //	src: [ 'build/**/*.css', '!build/main.css' ]
            //},
            //scripts: {
            //	src: [ 'build/**/*.js', '!build/main.js' ]
            //}
        },

        stylus: {
            build: {
                options: {
                    linenos: false,
                    compress: false
                },
                files: [{
                    expand: true,
                    cwd: 'source/app/stylus',

                    src: ['main.styl'],
                    dest: 'build/app/css',
                    ext: '.css'
                }]
            }
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
                                name: "Dopamine" // TODO: Move to external settings file
                            }
                        }

                    }
                },
                files: [{
                    cwd: "source/app/views",
                    src: ["**/*.jade", '!**/_*.jade', '!**/dp-*.jade'],
                    dest: "build",
                    expand: true,
                    ext: ".html"
                }]
            }
            /*build: {
			options: {
				data: function(dest, src) {
					return {
						from: '',
						to: dest
					};
				}
			}
		}*/
        },

        prettify: {
            options: {
                indent: 1,
                indent_char: '	',
                wrap_line_length: 0,
                preserve_newlines: true,
                brace_style: 'expand',
                max_preserve_newlines: 2,
                unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre']
            },
            // Prettify a directory of files
            all: {
                expand: true,
                cwd: 'build/',
                ext: '.html',
                src: ['*.html'],
                dest: 'build/'
            }
        },

        //autoprefixer: {
        //	build: {
        //		expand: true,
        //		cwd: 'build',
        //		src: [ '**/*.css' ],
        //		dest: 'build'
        //	}
        //},

        //cssmin: {
        //	build: {
        //		files: {
        //			'build/main.css': [ 'build/main.css' ]
        //		}
        //	}
        //},

        //coffee: {
        //	build: {
        //		expand: true,
        //		cwd: 'source',
        //		src: [ '**/*.coffee' ],
        //		dest: 'build',
        //		ext: '.js'
        //	}
        //},

        //uglify: {
        //	build: {
        //		options: {
        //			mangle: false
        //		},
        //		files: {
        //			'build/main.js': [ 'build/main.js' ]
        //		}
        //	}
        //},

        watch: {
            stylesheets: {
                files: 'source/app/stylus/**/*.styl',
                tasks: ['stylesheets']
            },
            sass: {
                files: ['source/app/sass/**/*.{scss,sass}'],
                tasks: ['sass:dev']
            },
            //	scripts: {
            //		files: 'source/**/*.coffee',
            //		tasks: [ 'scripts' ]
            //	},
            jade: {
                files: 'source/app/views/**/*.jade',
                tasks: [ 'markup' ]
            }//,
            //copy: {
            //    files: [ 'source/**', '!source/**/*.styl', '!source/**/*.coffee', '!source/**/*.jade' ],
            //    tasks: [ 'copy' ]
            //}
        },

        connect: {
            server: {
                options: {
                    port: 4000,
                    base: 'build',
                    hostname: '*'
                }
            }
        }

    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-autoprefixer');
    //grunt.loadNpmTasks('grunt-contrib-coffee');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-indent');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-sass');


    // define the tasks

    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.', [
        //'stylus'
        'sass:dev'
         /*,'autoprefixer' ,'cssmin','clean:stylesheets'*/ ]
    );


    grunt.registerTask(
        'markup',
        'Compiles jade.', ['jade', 'prettify' /*,'autoprefixer' ,'cssmin','clean:stylesheets'*/ ]
    );

    //grunt.registerTask(
    //	'scripts',
    //	'Compiles the JavaScript files.',
    //	['coffee', 'uglify', 'clean:scripts']
    //	);

    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.', [
        'clean', 'copy', 'stylesheets', 'markup' /*, 'scripts'*/ ]
    );

    grunt.registerTask(
        'default',
        'Watches the project for changes, automatically builds them and runs a server.', [
        'build', 
        'connect', 
        'watch'
        ]
    );


};