(function() {
    'use strict';

    var watch = {
        js: {
            files: ['src/**/*.js'],
            tasks: ['uglify']
        },
        less: {
            files: ['src/**/*.less'],
            tasks: ['less', 'cssmin']
        }
    };

    var concat = {
        options: {
            separator: '\n'
        },
        dist: {
            src: [
                'src/modal.js',
                'src/modal.templates.js',
                'src/modal.service.js',
                'src/modal.controller.js',
                'src/modal.directive.js'
            ],
            dest: 'dest/modal.js'
        }
    };

    var uglify = {
        dest: {
            files: {
                'dest/modal.min.js': [
                    'dest/modal.js'
                ]
            }
        }
    };

    var cssmin = {
        target: {
            files: {
                'dest/modal.min.css': ['dest/modal.css']
            }
        }
    };

    var less = {
        options: {},
        dest: {
            files: {
                'dest/modal.css': 'src/modal.less'
            }
        }
    };

    var clean = {
        dest: {
            files: [{
                src: ['dest', 'docs/libs']
            }]
        }
    };

    var copy = {
        main: {
            files: [
                {
                    expand: true,
                    src: 'angular.min.js',
                    dest: 'docs/libs/angular/',
                    cwd: 'bower_components/angular/'
                },
                {
                    expand: true,
                    src: 'angular-animate.min.js',
                    dest: 'docs/libs/angular-animate/',
                    cwd: 'bower_components/angular-animate/'
                },
                {
                    expand: true,
                    src: '**',
                    dest: 'docs/libs/modal/',
                    cwd: 'dest/'
                }
            ]
        }
    };
    
    module.exports = function(grunt) {
        require('jit-grunt')(grunt, {});

        grunt.initConfig({
            watch: watch,
            concat: concat,
            uglify: uglify,
            cssmin: cssmin,
            less: less,
            clean: clean,
            copy: copy
        });

        grunt.registerTask('dest', [
            'clean',
            'concat',
            'uglify',
            'less',
            'cssmin',
            'copy'
        ]);

        grunt.registerTask('default', [
            'dest',
            'watch'
        ]);
    };
})();