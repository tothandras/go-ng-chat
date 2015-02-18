((): void => {
    'use strict';

    /* @ngInject */
    function config($locationProvider: ng.ILocationProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/home');
    }

    angular.module('chat').config(config);
})();
