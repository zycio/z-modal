(function() {
    'use strict';

    describe('Modal service ::', function() {
        var service,
            $compile,
            $rootScope,
            $timeout,
            $document;

        beforeEach(module('z-modal'));
        beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$document_, _ZModal_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
            $document = _$document_;
            service = _ZModal_;
        }));

        describe('close', function() {
            it('should remove modal from DOM', function() {
                service._open();

                service._close();
                $timeout.flush();

                expect($document.find('z-modal').html()).toBeUndefined();
                $timeout.verifyNoPendingTasks();
            });
        });

        describe('open', function() {
            it('should add modal to DOM', function() {
                service._open();

                expect($document.find('z-modal').html()).toEqual('');

                service._close();
                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should add modal to DOM and remove after 1 second', function() {
                service.config = {
                    autoclose: 1000
                };

                service._open();
                $timeout.flush();
                $timeout.flush();

                $timeout.verifyNoPendingTasks();
                expect($document.find('z-modal').html()).toBeUndefined();
            });
        });

        describe('closeConfirm', function() {
            beforeEach(function() {
                service._open();
                spyOn(service.deferred, 'resolve');
            });

            afterEach(function() {
                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should close modal with confirmation', function() {
                var data = {
                    username: 'user'
                };

                service.close.confirm(data);

                expect(service.deferred.resolve).toHaveBeenCalledWith(data);
            });
        });

        describe('closeCancel', function() {
            beforeEach(function() {
                service._open();
                spyOn(service.deferred, 'reject');
            });

            afterEach(function() {
                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should close modal with cancellation', function() {
                var data = {
                    username: 'user'
                };

                service.close.cancel(data);

                expect(service.deferred.reject).toHaveBeenCalled();
            });
        });

        describe('info', function() {
            afterEach(function() {
                service._close();
                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should open info modal', function() {
                service.info('Modal header', 'Modal description');

                expect(service.config).toEqual({
                    header: 'Modal header',
                    description: 'Modal description',
                    buttons: {
                        confirm: 'OK'
                    }
                });
            });
        });

        describe('confirm', function() {
            afterEach(function() {
                service._close();
                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should open confirm modal', function() {
                var modal = service.confirm('Modal header', 'Modal description');

                expect(service.config).toEqual({
                    header: 'Modal header',
                    description: 'Modal description',
                    buttons: {
                        cancel: 'Cancel',
                        confirm: 'Confirm'
                    }
                });
                expect(modal).toBeDefined();
            });
        });

        describe('confirm', function() {
            afterEach(function() {
                service._close();
                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should open custom modal if buttons not specified', function() {
                var modal = service.custom({
                    template: 'modal-template.html',
                    header: 'Custom header'
                });

                expect(service.config).toEqual({
                    template: 'modal-template.html',
                    header: 'Custom header',
                    buttons: {
                        cancel: 'Cancel',
                        confirm: 'Confirm'
                    }
                });
                expect(modal).toBeDefined();
            });

            it('should open custom modal if buttons specified', function() {
                var modal = service.custom({
                    template: 'modal-template.html',
                    header: 'Custom header',
                    buttons: {
                        confirm: 'OK'
                    }
                });

                expect(service.config).toEqual({
                    template: 'modal-template.html',
                    header: 'Custom header',
                    buttons: {
                        confirm: 'OK'
                    }
                });
                expect(modal).toBeDefined();
            });
        });
    });
})();