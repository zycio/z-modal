(function() {
    'use strict';

    var app = angular.module('demoApp');

    var injects = ['ZModal'];

    var Controller = function(ZModal) {
        var vm = this;

        vm.show = function(type) {
            switch (type) {
                case 'custom':
                    ZModal.custom({
                        template: 'modal-template.html',
                        header: 'Custom header'
                    })
                    .then(function(data) {
                        vm.data = data;
                    })
                    .catch(function() {
                        vm.data = 'Cancelled.';
                    });
                    break;
                case 'info':
                    ZModal.info('Info modal', 'Any info text');
                    break;
                case 'confirm':
                    ZModal.confirm('Removing user', 'Do you want to remove user?')
                        .then(function() {
                            vm.data = 'Confirmed.';
                        })
                        .catch(function() {
                            vm.data = 'Cancelled.';
                        });
                    break;
            }
        };
    };

    app.controller('DemoController', injects.concat([Controller]));
})();