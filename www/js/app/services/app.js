"use strict";

module.exports = /*@ngInject*/ function(FriendsService, websocketInteraction) {

    return {

        init() {
            console.log('App init');

            return FriendsService.init().then(() => {
                websocketInteraction.onMessage(data => {
                    console.log('OnMessage', data);

                    FriendsService.setMessage(data);
                });

                websocketInteraction.onFriend(data => {
                    console.log('OnFolder', data);

                    FriendsService.setFriend(data);
                });
                
                websocketInteraction.onError(data => {
                    console.log('Error', data);
                })
            });
        },

        get friendsService() {
            return FriendsService;
        }

    };
};

