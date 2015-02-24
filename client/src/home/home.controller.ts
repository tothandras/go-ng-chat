module chat.home {
    'use strict';

    export interface IUser {
        id: number;
        name: string;
    }

    export interface IMessage {
        time: Date;
        message: string;
    }

    export interface IHomeScope {
        name: string;
        messages: Array<IMessage>;
        message: string;
    }

    class HomeController implements IHomeScope {
        name: string;
        messages: Array<IMessage>;
        message: string;
        socket: any;

        send(): void {
            this.socket.emit('send_message', this.message);
            this.message = '';
        }

        /* @ngInject */
        constructor(socket: chat.socket.ISocket, $scope: ng.IScope) {
            this.socket = socket;
            socket.forward('message', $scope);
            this.name = 'Chat';
            this.messages = new Array<IMessage>();

            $scope.$on('socket:message', (ev: ng.IAngularEvent, data: string): void => {
               if (this.messages.length > 100) {
                   this.messages.splice(0, 1);
               }
               var msg: IMessage = JSON.parse(data);
               this.messages.push(msg);
           });
        }
    }

    // register HomeController
    angular.module('chat.home')
        .controller('HomeController', HomeController);
}
