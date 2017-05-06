(function() {
    'use strict';

    var modal = angular.module('z-modal');

    var injects = ['ZModal'];

    var Directive = function(ZModal) {
        return {
            restrict: 'E',
            templateUrl: 'modal.html',
            controller: 'ModalController as vm',
            replace: true,
            transclude: false
        };
    };

    modal.directive('zModal', injects.concat([Directive]));
})();