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

    var uglify = {
        dest: {
            files: {
                'dest/modal.min.js': [
                    'src/modal.js',
                    'src/modal.templates.js',
                    'src/modal.service.js',
                    'src/modal.controller.js',
                    'src/modal.directive.js'
                ]
            }
        }
    };

    var cssmin = {
        target: {
            files: {
                'dest/modal.min.css': ['.tmp/modal.css']
            }
        }
    };

    var less = {
        options: {},
        dest: {
            files: {
                '.tmp/modal.css': 'src/modal.less'
            }
        }
    };

    var clean = {
        dest: {
            files: [{
                src: ['dest', 'docs/libs', '.tmp']
            }]
        },
        tmp: {
            files: [{
                src: ['.tmp']
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
            uglify: uglify,
            cssmin: cssmin,
            less: less,
            clean: clean,
            copy: copy
        });

        grunt.registerTask('dest', [
            'clean:dest',
            'uglify',
            'less',
            'cssmin',
            'clean:tmp',
            'copy'
        ]);

        grunt.registerTask('default', [
            'dest',
            'watch'
        ]);
    };
})();