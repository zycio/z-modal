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