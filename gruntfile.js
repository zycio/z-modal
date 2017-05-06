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
                src: ['dest']
            }]
        }
    };
    
    module.exports = function(grunt) {
        require('jit-grunt')(grunt, {});

        grunt.initConfig({
            watch: watch,
            uglify: uglify,
            cssmin: cssmin,
            less: less,
            clean: clean
        });

        grunt.registerTask('default', [
            'clean',
            'uglify',
            'less',
            'cssmin',
            'watch'
        ]);
    };
})();