module common.services {
    'use strict';

    export interface IChatService {

    }

    interface IMessage {
        id: number;
        username: string;
        content: string;
    }

    class ChatService implements IChatService {

    }
}
