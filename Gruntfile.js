'use strict';

module.exports = function(grunt) {

    /**
     * Paths
     */
    var path = {
        src: './src',
        dist: './dist',
        scss: './src/scss',
        js: './src/js'
    };
    

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Generates CSS files from SCSS files from source directory to distribution directory
         **/
        sass: {
            dist: {
                files: [{
                    expand: false,
                    src: path.src + '/scss/styles.scss',
                    dest: path.dist + '/css/styles.css'
                }]
            }
        },

        /**
         * Minimize CSS files from distribution directory to distribution directory (Override)
         * Use on build tasks
         */
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: path.dist + '/css',
                    src: ['*.css', '!*.min.css'],
                    dest: path.dist + '/css',
                    ext: '.css'
                }]
            }
        },

        /**
         * Copy HTML and Javascript files form source directory to distribution directory
         * Use on dev and build tasks
         */
        copy: {
          html: {
            expand: true,
            cwd: path.src,
            src: '*.html',
            dest: path.dist,
          },
          js: {
            expand: true,
            cwd: path.js,
            src: '*.js',
            dest: path.dist + '/js',
          },
        },

        /**
         * Concatenate all javascript files on the source directory to a unique 'app.js' file into the distribution folder
         * Use on build tasks
         */
        concat: {
            dist: {
                expand: false,
                src: path.js + '/*.js',
                dest: path.dist + '/js/app.js',
            },
        },

        /**
         * Uglify from dist to dist
         * This task runs after concat task, so that use the same source and distribution directories.
         * Use on build tasks
         */
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                }
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: path.dist + '/js',
                    src: '**/*.js',
                    dest: path.dist + '/js'
                }]
            }
        },

        /**
         * JSHint Validate Javascript files from source directory and report on the terminal window
         */
        jshint: {
            ignore_warning: {
                options: {
                    reporter: require('jshint-stylish'),
                    '-W015': true,
                },
                src: [path.js],
            },
        },

        /**
         * Cleans distribution directory
         */
        clean: [path.dist],

        /**
         * Process HTML, merge script tags
         */
        processhtml: {
            build: {
                options: {
                    data: {
                        message: 'This is production environment'
                    }
                },
                files: [{
                    expand: true,
                    cwd: path.dist,
                    src: '*.html',
                    dest: path.dist,
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: path.src + '/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },


        /**
         * Create a local server form dist directory
         */
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: 'dist'
                }
            }
        },

        /**
         * Watch files and runs specific tasks
         */
        watch: {
          
            scss: {
                files: [path.scss + '/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },

            html: {
                files: [path.src + '/*.html'],
                tasks: ['copy:html'],
                options: {
                    spawn: false,
                },
            },

            js: {
                files: [path.js + '/*.js'],
                tasks: ['jshint', 'copy:js'],
                options: {
                    spawn: false,
                },
            },

            image: {
                files: [path.src + '/**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                },
            },
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('dist', ['clean', 'sass', 'jshint', 'imagemin', 'copy']);
    grunt.registerTask('dev', ['dist', 'connect', 'imagemin', 'watch']);
    grunt.registerTask('build', ['clean', 'sass', 'cssmin', 'jshint', 'concat', 'uglify', 'copy:html', 'imagemin', 'processhtml']);


};