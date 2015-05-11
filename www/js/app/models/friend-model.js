"use strict";

module.exports = /*@ngInject*/ function(CorrespondenceModel, websocketInteraction) {

    class FriendModel {
        constructor(source) {
            this.__id = source.id;
            this.__username = source.username;
            this.__isOnline = source.isOnline || false;
            this.__isFriend = source.isFriend || true;
            this.__hasUnread = source.hasUnread || false;
            this.__photoUrl = source.photoUrl;
            this.__correspondence = new CorrespondenceModel();
        }

        get chatUrl() {
            return "#/app/chat/" + this.__id;
        }

        get correspondence() {
            return this.__correspondence.list;
        }

        get username() {
            return this.__username;
        }

        get id() {
            return this.__id;
        }

        get photoUrl() {
            return this.__photoUrl;
        }

        setMessage(data) {
            var correspondence = this.__correspondence;
            var msg = correspondence.setMessage(data);
        }

        sendMessage(message) {
            var correspondence = this.__correspondence;
            console.log('MEssage', message);
            
            var msg = correspondence.setMessage(message);

            console.log('Msg', msg);
            
            
            var data = this.generateData(msg);
            console.log('Data', data);
            
            websocketInteraction.sendMessage(data);
        }

        generateData(msg) {
            var friendId = this.id;

            return {
                type_message: msg.type,
                message: msg.message,
                timeout: msg.timeout,
                id_friend: friendId,
                id_message: msg.id
            };
        }

        deleteMessage(id) {
            this.__correspondence.deleteMessage(id);
        }
    }

    return FriendModel;
};