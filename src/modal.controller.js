(function() {
    'use strict';

    var modal = angular.module('z-modal');

    var injects = ['ZModal'];

    var Controller = function(ZModal) {
        var vm = this;
        vm.data = {};

        vm.config = ZModal.config;

        vm.cancel = function() {
            ZModal.close.cancel();
            vm.data = {};
        };

        vm.confirm = function() {
            ZModal.close.confirm(vm.data);
            vm.data = {};
        };
    };

    modal.controller('ModalController', injects.concat([Controller]));
})();