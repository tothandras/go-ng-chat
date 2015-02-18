((): void => {
    'use strict';

    /* @ngInject */
    function config($stateProvider: ng.ui.IStateProvider): void {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'home.tpl.html',
            controller: 'HomeController',
            controllerAs: 'home'
        });
    }

    angular.module('chat.home')
        .config(config);
})();
