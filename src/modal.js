(function() {
    'use strict';

    var modal = angular.module('z-modal', [
        'ngAnimate'
    ]);

    var injects = ['$compileProvider'];

    var Config = function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    };    

    modal.config(injects.concat([Config]));
})();