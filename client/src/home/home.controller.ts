module chat.home {
    'use strict';

    export interface IUser {
        id: number;
        name: string;
    }

    export interface IMessage {
        /*user: IUser;*/
        time: Date;
        content: string;
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

        send(): void {
            this.messages.push({
                content: this.message,
                time: new Date()
            });
            this.message = '';
        }

        /* @ngInject */
        constructor() {
            this.name = 'Chat';
            this.messages = new Array<IMessage>();
            /*for (var i: number = 0; i < 100; i++) {
                var testMessage: IMessage = {
                    time: new Date(),
                    content: 'Test message ' + i
                }
                this.messages.push(testMessage);
            }*/
        }
    }

    // register HomeController
    angular.module('chat.home')
        .controller('HomeController', HomeController);
}
