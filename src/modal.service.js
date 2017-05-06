(function() {
    'use strict';

    var modal = angular.module('z-modal');

    var injects = ['$rootScope', '$q', '$compile', '$timeout', '$document'];

    var Service = function($rootScope, $q, $compile, $timeout, $document) {
        var self = this;

        var close = function() {
            self.element.removeClass('modal-open');
            self.element.addClass('modal-close');

            $timeout(function() {
                self.element.remove();
            }, 500);
        };

        var open = function() {
            self.element = $compile(angular.element('<z-modal class="modal-open"></z-modal>'))($rootScope.$new());
            self.deferred = $q.defer();
            angular.element($document[0].body).append(self.element);

            if (self.config && self.config.autoclose) {
                $timeout(function() {
                    close();
                }, self.config.autoclose);
            }
        };

        var closeConfirm = function(data) {
            close();
            self.deferred.resolve(data);
        };

        var closeCancel = function() {
            close();
            self.deferred.reject();
        };

        var info = function(header, description) {
            self.config = {
                header: header,
                description: description,
                buttons: {
                    confirm: 'OK'
                }
            };

            open();
        };

        var confirm = function(header, description) {
            self.config = {
                header: header,
                description: description,
                buttons: {
                    cancel: 'Cancel',
                    confirm: 'Confirm'
                }
            };

            open();

            return self.deferred.promise;
        };

        var custom = function(config) {
            self.config = config;
            if (!self.config.buttons) {
                self.config.buttons = {
                    cancel: 'Cancel',
                    confirm: 'Confirm'
                };
            }

            open();
            
            return self.deferred.promise;
        };

        self._close = close;
        self._open = open;

        self.close = {
            confirm: closeConfirm,
            cancel: closeCancel
        };
        self.info = info;
        self.custom = custom;
        self.confirm = confirm;
    };

    modal.service('ZModal', injects.concat([Service]));
})();