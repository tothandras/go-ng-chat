module chat.home {
    'use strict';

    interface IHomeScope {
        title: string
    }

    class HomeController implements IHomeScope {
        title: string;

        /* @ngInject */
        constructor() {
            this.title = 'Home Controller';
        }
    }

    ((): void => {
        'use strict';

        angular.module('chat.home')
            .controller('HomeController', HomeController);
    })();
}
