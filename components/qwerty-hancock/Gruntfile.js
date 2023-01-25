module.exports = function (grunt) {
    'use strict';

    // Project config.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                expand: true,
                filter: 'isFile',
                cwd: 'src/',
                src: 'qwerty-hancock.js',
                dest: 'dist/'
            }
        },

        karma: {
            unit: {
                configFile: 'karma-conf.js'
            }
        },

        jasmine_node: {
          options: {
            forceExit: true,
            match: '.',
            matchall: false,
            extensions: 'js',
            specNameMatcher: 'spec'
          },
          spec: ['tests/qh-node-spec']
        },

        uglify: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
                }
            },
            options: {
                banner: '/* <%= pkg.title %> <%= pkg.version %> (c) 2012-<%= grunt.template.today("yy") %> Stuart Memo */\n'
            }
        },

    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jasmine-node');

    // Tasks.
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('build', ['copy', 'uglify']);
    grunt.registerTask('test', ['jasmine_node:spec', 'karma']);
};
