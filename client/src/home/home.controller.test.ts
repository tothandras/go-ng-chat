module chat.home {
    'use strict';

    ((): void => {
        'use strict';

        beforeEach((): void => {
            module('chat.home');
        });

        describe('chat.home.HomeController', (): void => {
            var createController: Function;
            var scope: any;

            function injected($injector: ng.auto.IInjectorService): void {
                var $rootScope: ng.IRootScopeService = $injector.get('$rootScope');
                var $controller: ng.IControllerService = $injector.get('$controller');
                scope = $rootScope.$new();
                createController = function(): void {
                    $controller('HomeController as home', {
                        $scope: scope
                    });
                }
            }

            beforeEach(inject(injected));

            it('should be defined', (): void => {
                createController();
                expect(scope.home).toBeDefined();
            });

            it('should have a title', (): void => {
                createController();
                expect(scope.home.name).toBeDefined();
                expect(scope.home.name).toBe('Chat');
            });
        });
    })();
}
