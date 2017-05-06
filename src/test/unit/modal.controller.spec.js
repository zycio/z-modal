(function() {
    'use strict';

    describe('Modal controller ::', function() {
        var controller,
            service;

        beforeEach(module('z-modal'));
        beforeEach(inject(function(_$controller_, _ZModal_) {
            service = _ZModal_;

            controller = _$controller_('ModalController', {
                Zmodal: service
            });
        }));

        describe('cancel', function() {
            beforeEach(function() {
                spyOn(service.close, 'cancel');
            });
            
            it('should close (cancel) modal and clear data', function() {
                controller.data = {
                    username: 'user'
                };

                controller.cancel();

                expect(service.close.cancel).toHaveBeenCalled();
                expect(controller.data).toEqual({});
            });
        });

        describe('confirm', function() {
            beforeEach(function() {
                spyOn(service.close, 'confirm');
            });

            it('should close (confirm) modal and clear data', function() {
                controller.data = {
                    username: 'user'
                };

                controller.confirm();

                expect(service.close.confirm).toHaveBeenCalled();
                expect(controller.data).toEqual({});
            });
        });
    });
})();