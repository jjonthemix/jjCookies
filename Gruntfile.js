/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/jjCookies.css': 'src/jjCookies.scss'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! jjCookies <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/jjCookies.jquery.js',
                dest: 'public/jjCookies.jquery.min.js',
            }
        },
        watch: {
            files: ['src/*'],
            tasks: ['uglify', 'sass']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /*
     Default task. Compiles templates, neuters application code, and begins
     watching for changes.
     */
    grunt.registerTask('default', ['watch']);
};