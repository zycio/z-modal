(function() {
    'use strict';

    module.exports = function(config) {
        config.set({
            basePath: '',
            frameworks: ['jasmine'],
            files: [
                'bower_components/angular/angular.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-mocks/angular-mocks.js',

                'src/modal.js',
                'src/modal.controller.js',
                'src/modal.service.js',

                'src/test/unit/**/*.js'
            ],
            exclude: [

            ],
            preprocessors: {
                'src/**/!(*spec).js': ['coverage']
            },
            reporters: ['progress', 'coverage'],
            coverageReporter: {
                reporters: [{
                    type: 'html',
                    dir: 'src/test',
                    subdir: 'coverage'
                }]
            },
            port: 9876,
            colors: true,
            logLevel: config.LOG_DEBUG,
            autoWatch: false,
            browsers: ['PhantomJS'],
            singleRun: true,
            background: false
        });
    };
})();