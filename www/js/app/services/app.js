"use strict";

module.exports = /*@ngInject*/ function(FriendsService, websocketInteraction) {

    return {

        init() {
            console.log('App init');

            return FriendsService.init().then(() => {

                websocketInteraction.on(event => {
                    var type = event.type;
                    var data = event.body;

                    console.log('On message', event);
                    
                        
                    switch(type) {

                        case 'message':
                            FriendsService.setMessage(data);
                            break;

                    }
                });

            });
        },

        get friendsService() {
            return FriendsService;
        }

    };
};

