(function() {
    'use strict';

    var app = angular.module('demoApp', [
        'z-modal'
    ]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['demoApp'], {
            strictDi: false
        });
    });
})();