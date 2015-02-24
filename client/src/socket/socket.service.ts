module chat.socket {
    'use strict';

    export interface ISocket {
        forward(message: string): void;
        forward(message: string, scope: ng.IScope): void;
        emmit(message: string): void;
    }

    /* @ngInject */
    function socket(socketFactory: Function): ISocket {
        var socket: ISocket = socketFactory();
        socket.forward('error');
        return socket;
    }
    // register SocketService
    angular.module('chat.socket')
        .factory('socket', socket);
}
