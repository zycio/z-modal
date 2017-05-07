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
(function() {
    'use strict';

    var modal = angular.module('z-modal');

    var injects = ['$templateCache'];

    var Templates = function($templateCache) {
        $templateCache.put('modal.html',
            '<div class="z-modal">\
                <div class="z-modal-content">\
                    <div class="z-modal-header">\
                        {{ ::vm.config.header }}\
                    </div>\
                    <div class="z-modal-body" ng-switch="vm.config.type">\
                        <div ng-if="vm.config.template">\
                            <div ng-include="vm.config.template"></div>\
                        </div>\
                        <div ng-if="!vm.config.template">\
                            {{ ::vm.config.description }}\
                        </div>\
                    </div>\
                    <div class="z-modal-buttons">\
                        <button ng-if="vm.config.buttons.cancel"\
                                ng-click="vm.cancel()">\
                                {{ ::vm.config.buttons.cancel }}\
                        </button>\
                        <button ng-if="vm.config.buttons.confirm"\
                                ng-click="vm.confirm()">\
                                {{ ::vm.config.buttons.confirm }}\
                        </button>\
                    </div>\
                </div>\
            </div>'
        );
    };

    modal.run(injects.concat([Templates]));
})();
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