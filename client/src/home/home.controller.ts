module chat.home {
    'use strict';

    export interface IHomeScope {

    }

    class HomeController implements IHomeScope {
        name: string;

        /* @ngInject */
        constructor() {
            this.name = 'Home Controller';
        }
    }

    // register HomeController
    angular.module('chat.home')
        .controller('HomeController', HomeController);
}
